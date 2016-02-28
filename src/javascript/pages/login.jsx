'use strict'

const React = require('react');
import Header from '../components/header.jsx';
import { Form, fieldset, Input } from 'amazeui-react';

export default class Login extends React.Component {
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
                            <Input placeholder="用户名" icon="user" ref="username"/>
                            <Input type="password" icon="lock" placeholder="密码" ref="password"/>
                        </fieldset>
                        <Input 
                            type="submit" 
                            value="登录" 
                            amStyle="primary" 
                            block 
                            onClick={ e => {
                                handleLogin(this.refs.username.getValue(), this.refs.password.getValue());
                            }}
                         />
                    </Form>
                </div>
            </div>
        )
    }
}