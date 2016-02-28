'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
const Action = require('./action.js');
const Store = require('./store.js');
import { Router, Route, IndexRoute } from 'react-router';

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
    
    handleLogin (username, password) {
        io.socket.request({
                method: 'post',
                url: '/auth',
                data: {username, password},
                headers: {authorization: io.sails.token},
            }, (result, jwr) => {
                console.log(jwr);
                console.log(result);
                io.sails.token = result.token;
            }
        );
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
                <Header/>
                { React.createElement(Child, props[Child.name]) }
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ Store }>
        <Router>
            <Route path="/" component={ ConnectedApp }>
                <IndexRoute page="Main" component={ Main }/>
                <Route path="register" component={ Register }/>
                <Route path="login" component={ Login }/>
            </Route>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);