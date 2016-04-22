'use strict';

import React from 'react';
import Header from '../components/header.jsx';
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

export default class Login extends React.Component {
    checkValue (username, password) {
        this.setState({
            username: undefined,
            password: undefined
        });
        
        if (username === '') {
            message.error('请输入用户名');
            this.setState({username: 'error'});
            return false;
        } 
        
        if (password === '') {
            message.error('请输入密码');
            this.setState({password: 'error'});
            return false;
        } 
        return true;
    }
    
    constructor (props) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined
        };
    }
    
    render () {
        const { handleLogin } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 }
        };
        const checkboxItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 2 }
        };
        
        return (
            <div style={{
                flex: 1
            }}>
                <div style={{
                    width: 400,
                    margin: '100px auto',
                    textAlign: 'center'
                }}>
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="用户名："
                            validateStatus={ this.state.username }>
                            <Input type="text" ref="username" placeholder="用户名" onKeyDown={ e => { if(e.keyCode === 13) this.refs.send.props.onClick(); }}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码："
                             validateStatus={ this.state.password }>
                            <Input type="password" ref="password" placeholder="密码" onKeyDown={ e => { if(e.keyCode === 13) this.refs.send.props.onClick(); }}/>
                        </FormItem>
                        <FormItem
                            {...checkboxItemLayout}
                            label="记住密码">
                            <Input type="checkbox" ref="remembered"/>
                        </FormItem>
                    </Form>
                    <Button 
                        amStyle="primary" 
                        block
                        ref="send" 
                        onClick={ () => {
                            let username = this.refs.username.refs.input.value;
                            let password = this.refs.password.refs.input.value;
                            let remembered = this.refs.remembered.refs.input.checked;
                            if (!this.checkValue.bind(this)(username, password, remembered)) {
                                return;
                            }
                            handleLogin(username, password, this);
                        }}
                    >登录</Button>
                </div>
            </div>
        );
    }
}