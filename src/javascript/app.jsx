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

io.sails.url = 'http://localhost:1337';

export default class App extends React.Component {
    handleLinkmanClick (index) {
        this.props.dispatch(Action.setLinkmanFocus(index));
    }
    
    handleLogin (username, password, component) {
        io.socket.post('/auth', {username, password, token: io.sails.token}, (result, jwr) => {
                if (jwr.statusCode === 201) {
                    io.sails.token = result.token;
                    this.props.history.push('/');
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
            }
        );
    }
    
    handleLogout () {
        io.socket.delete('/auth', {token: io.sails.token}, (result, jwr) => {
            io.sails.token = null;
            this.props.history.push('/');
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
    
    render() {
        console.log('token', io.sails.token);
        const { user, linkmans, linkmanFocus } = this.props.reducer;
        
        const Child = this.props.children.type;
        const props = {
            Main: {
                user,
                linkmans,
                linkmanFocus,
                handleLinkmanClick: this.handleLinkmanClick.bind(this),
            },
            Register: {
                handleRegister: this.handleRegister.bind(this),
            },
            Login: {
                handleLogin: this.handleLogin.bind(this),
            }
        }
        
        return (
            <div style={{
                height: window.innerHeight,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header handleLogout={ this.handleLogout.bind(this) } isLogged={ io.sails.token !== undefined && io.sails.token !== null }/>
                { React.createElement(Child, props[Child.name]) }
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ Store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ ConnectedApp }>
                <IndexRoute page="Main" component={ Main }/>
                <Route path="register" component={ Register }/>
                <Route path="login" component={ Login }/>
            </Route>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);