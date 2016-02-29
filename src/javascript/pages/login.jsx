'use strict'

const React = require('react');
import Header from '../components/header.jsx';
import { Form, fieldset, Input } from 'amazeui-react';

export default class Login extends React.Component {
    checkValue () {
        if (this.refs.username.getValue() === "") {
            this.refs.info.innerText = '请输入用户名';
            this.setState({username: 'error'});
            return false;
        } 
        else {
            this.setState({username: ''});
        }
        
        if (this.refs.password.getValue() === "") {
            this.refs.info.innerText = '请输入密码';
            this.setState({password: 'error'});
            return false;
        } 
        else {
            this.setState({password: ''});
        }
        
        this.refs.info.innerText = '';
        return true;
    }
    
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    
    render () {
        const { handleLogin } = this.props;
        return (
            <div style={{
                flex: 1,
            }}>
                <div style={{
                    width: 300,
                    margin: '100px auto',
                    textAlign: 'center',
                }}>
                    <Form>
                        <span style={{
                            color: 'red',
                        }} ref="info">
                        </span>
                        <fieldset className="am-form-set">
                            <Input placeholder="用户名" icon="user" ref="username" validation={ this.state.username }/>
                            <Input type="password" icon="lock" placeholder="密码" ref="password" validation={ this.state.password }/>
                        </fieldset>
                        <Input 
                            type="button" 
                            value="登录" 
                            amStyle="primary" 
                            block 
                            onClick={ e => {
                                if (!this.checkValue.bind(this)()) {
                                    return;
                                }
                                handleLogin(this.refs.username.getValue(), this.refs.password.getValue(), this);
                            }}
                         />
                    </Form>
                </div>
            </div>
        )
    }
}