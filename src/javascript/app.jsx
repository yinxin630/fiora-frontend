'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
const Action = require('./action.js');
const Store = require('./store.js');
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { message } from 'antd';
require('html5-desktop-notifications');
const Config = require('../../config.js');
const Default = require('./default.js');

const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);

import Header from './components/header.jsx';
import Main from './pages/main.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Setting from './pages/setting.jsx';
import About from './pages/about.jsx';
import Comment from './pages/comment.jsx';

message.config({top: 80});

io.sails.url = Config.server;

export default class App extends React.Component {
    handleLinkmanClick (user) {
        this.props.dispatch(Action.setCurrentLinkman(user));
    }
    
    handleLogin (username, password, component) {
        io.socket.post('/auth', {username, password, token: io.sails.token}, (result, jwr) => {
                if (jwr.statusCode === 201) {
                    io.sails.token = result.token;
                    window.sessionStorage.setItem('token', result.token);
                    this.props.history.push('/');
                    
                    io.socket.get('/user', {token: io.sails.token}, (result, jwr) => {
                        if (jwr.statusCode === 200) {
                            this.props.dispatch(Action.setUser(result));
                            this.props.dispatch(Action.setCurrentLinkman(result.groups[0]));
                            return;
                        }
                        this.props.dispatch(Action.setUser(undefined));
                    });
                }
                else {
                    if (result.msg.match(/user.*not exists/)) {
                        message.warn('该用户不存在');
                        return;
                    }
                    else if (result.msg.match(/password not correct/)) {
                        message.warn('密码错误');
                        return;
                    }
                }
                this.props.dispatch(Action.setLoginStatus(jwr.statusCode === 201));
            }
        );
    }
    
    handleLogout () {
        io.socket.delete('/auth', {token: io.sails.token}, (result, jwr) => {
            this.props.dispatch(Action.setLoginStatus(false));
            this.props.dispatch(Action.setUser(undefined));
            io.sails.token = null;
            window.location.reload();
        });
    }
    
    handleRegister (username, password, component) {
        io.socket.post('/user', {username: username, password}, (result, jwr) => {
            if (jwr.statusCode === 201) {
                this.props.history.push('/login');
            }
            else {
                if (result.msg === 'invalid username') {
                    return message.warn('用户名包含非法字符或者长度不合格');
                }
                else if (result.msg === 'invalid password') {
                    return message.warn('密码包含非法字符或者长度不合格');
                }
                else if (result.msg.match(/A record with that `username` already exists/)) {
                    return message.warn('该用户名已存在');
                }
                message.warn('注册失败, 请重试');
            }
        });
    }
    
    handleSetting (nickname, avatar) {
        if (!this.props.reducer.isLogged) {
            let user = this.props.reducer.user;
            if (nickname !== '') {
                user.nickname = nickname;
            }
            if (avatar !== '') {
                user.avatar = avatar;
            }
            
            this.props.history.push('/');
            return this.props.dispatch(Action.setUser(user));
        }
        
        io.socket.put('/user/0', {token: io.sails.token, nickname, avatar}, (result, jwr) => {
            if (jwr.statusCode === 200) {
                this.props.history.push('/');
                return this.props.dispatch(Action.setUserInfo(result));
            }
            this.props.dispatch(Action.setUser(undefined));
        });
    }
    
    handleSend (content, type, linkman) {
        if (!content || content === '') {
            return;
        }
        
        if (!this.props.reducer.isLogged) {
            return io.socket.post('/temporary', {
                from: {
                    id: this.props.reducer.user.id,
                    nickname: this.props.reducer.user.nickname,
                    avatar: this.props.reducer.user.avatar,
                },
                content: content,
                type: type,
            }, (result, jwr) => { });
        }
        
        io.socket.post('/message', {
                token: io.sails.token,
                from: this.props.reducer.user.id,
                to: linkman.id,
                content: content,
                type: type,
            }, (result, jwr) => { }
        );
    }
    
    handleComment (content) {
        if (content === '') {
            return;
        }
        if (!this.props.reducer.isLogged) {
            return message.warn('请登录后再发表评论, 谢谢参与!');
        }
        io.socket.post('/comment', {token: io.sails.token, content}, (result, jwr) => {
            if (jwr.statusCode === 200) {
                this.getComment();
                return message.warn('添加评论成功, 谢谢参与!');
            }
        });
    }
    
    getComment () {
        io.socket.get('/comment', {}, (result, jwr) => {
            if (jwr.statusCode === 200) {
                this.props.dispatch(Action.setComments(result));
            }
        });
    }
    
    constructor (props, context) {
        super(props, context);
        this.state = {
            height: window.innerHeight,
        }
    }
 
    componentWillMount () {
        let token = window.sessionStorage.getItem('token');
        io.socket.get('/auth', {token}, (result, jwr) => {
            if (jwr.statusCode === 200) {
                io.sails.token = token;
                
                return io.socket.get('/user', {token: io.sails.token}, (result, jwr) => {
                    if (jwr.statusCode === 200) {
                        this.props.dispatch(Action.setUser(result));
                        this.props.dispatch(Action.setCurrentLinkman(result.groups[0]));
                        this.props.dispatch(Action.setLoginStatus(true));
                        return;
                    }
                    this.props.dispatch(Action.setUser(undefined));
                    this.props.dispatch(Action.setLoginStatus(false));
                })
            }
            
            io.socket.get('/guest', {}, (result, jwr) => {
                if (jwr.statusCode === 200) {
                    this.props.dispatch(Action.setUser(result));
                    this.props.dispatch(Action.setCurrentLinkman(result.groups[0]));
                    this.props.dispatch(Action.setLoginStatus(false));
                    return;
                }
                this.props.dispatch(Action.setUser(undefined));
                this.props.dispatch(Action.setLoginStatus(false));
            })
        });
        
        io.socket.on('message', result => {
            if (!this.props.reducer.windowVisible) {
                let notification = notify.createNotification(result.from.nickname, {
                    icon: result.from.avatar,
                    body: result.content.slice(0, 60),
                    tag: result.from.id,
                });
            }
            this.props.dispatch(Action.addGroupMessage(result.toGroup, result));
        });
        
        
    }
    
    componentDidMount () {
        window.onfocus = () => this.props.dispatch(Action.setWindowVisible(true));
        window.onblur = () => this.props.dispatch(Action.setWindowVisible(false));
        this.props.dispatch(Action.setWindowVisible(true));
        
        if (notify.permissionLevel() === notify.PERMISSION_DEFAULT) {
            notify.requestPermission();
        }
        else if (notify.permissionLevel() === notify.PERMISSION_DENIED) {
            alert('您已关闭了消息通知，如需桌面通知，请在浏览器设置中允许通知');
        }
        notify.config({
            pageVisibility: true,
            autoClose: 3000,
        });
    }
    
    render() {
        let { user, currentLinkman, isLogged, comments } = this.props.reducer;
        user = user || Default.user;
        currentLinkman = currentLinkman || Default.currentLinkman;
        isLogged = isLogged || Default.isLogged;
        comments = comments || Default.comments;
        
        const Child = this.props.children;
        const props = {
            main: {
                user,
                currentLinkman: currentLinkman,
                handleLinkmanClick: this.handleLinkmanClick.bind(this),
                handleSend: this.handleSend.bind(this),
            },
            register: {
                handleRegister: this.handleRegister.bind(this),
            },
            login: {
                handleLogin: this.handleLogin.bind(this),
            },
            setting: {
                handleSetting: this.handleSetting.bind(this),
            },
            comment: {
                handleComment: this.handleComment.bind(this),
                getComment: this.getComment.bind(this),
                comments,
            }
        }
        
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header handleLogout={ this.handleLogout.bind(this) } isLogged={ isLogged }/>
                {
                    Child && React.cloneElement(Child, props[Child.props.route.page || Child.props.route.path])
                }
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ Store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ ConnectedApp }>
                <IndexRoute page="main" component={ Main }/>
                <Route path="register" component={ Register }/>
                <Route path="login" component={ Login }/>
                <Route path="setting" component={ Setting }/>
                <Route path="about" component={ About }/>
                <Route path="comment" component={ Comment }/>
            </Route>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);