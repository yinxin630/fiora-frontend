'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
const Action = require('./action.js');
const Store = require('./store.js');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);

import Header from './components/header.jsx';
import Main from './pages/main.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Setting from './pages/setting.jsx';

io.sails.url = 'http://localhost:1337';

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
                        component.refs.info.innerText = '用户不存在';
                        return;
                    }
                    else if (result.msg.match(/password not correct/)) {
                        component.refs.info.innerText = '密码错误';
                        return;
                    }
                    component.refs.info.innerText = msg;
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
                component.refs.info.innerText = '注册失败，请重试';
            }
        });
    }
    
    handleSetting (nickname, avatar) {
        io.socket.put('/user/0', {token: io.sails.token, nickname, avatar}, (result, jwr) => {
            if (jwr.statusCode === 200) {
                this.props.history.push('/');
                return this.props.dispatch(Action.setUserInfo(result));
            }
            this.props.dispatch(Action.setUser(undefined));
        });
    }
    
    handleSend (message, linkman) {
        if (message === '') {
            return;
        }
        io.socket.post('/message', {
                token: io.sails.token,
                from: this.props.reducer.user.id,
                to: linkman.id,
                content: message,
            }, (result, jwr) => {
                // console.log(result);
                // console.log(jwr);
            }
        );
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
                
                io.socket.get('/user', {token: io.sails.token}, (result, jwr) => {
                    if (jwr.statusCode === 200) {
                        this.props.dispatch(Action.setUser(result));
                        this.props.dispatch(Action.setCurrentLinkman(result.groups[0]));
                        return;
                    }
                    this.props.dispatch(Action.setUser(undefined));
                })
            }
            this.props.dispatch(Action.setLoginStatus(jwr.statusCode === 200));
        });
        
        io.socket.on('message', result => {
            this.props.dispatch(Action.addGroupMessage(result.toGroup, result));
        });
    }
    
    componentDidMount () {
        window.addEventListener('resize', () => {
            this.setState({height: window.innerHeight});
        });
    }
    
    render() {
        let { user, currentLinkman, isLogged } = this.props.reducer;
        
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
            }
        }
        
        return (
            <div style={{
                height: this.state.height,
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
            </Route>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);