'use strict'

const React = require('react');
import Header from '../components/header.jsx';
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

export default class Register extends React.Component {
    checkValue (username, password, confirmPassword) {
        this.setState({
            username: undefined,
            password: undefined,
            confirmPassword: undefined,
        });
        
        if (username === "") {
            message.error('请输入用户名');
            this.setState({username: 'error'});
            return false;
        } 
        
        if (password === "") {
            message.error('请输入密码');
            this.setState({password: 'error'});
            return false;
        } 
        
        if (confirmPassword === "") {
            message.error('请输入重复密码');
            this.setState({confirmPassword: 'error'});
            return false;
        } 
        
        if (password !== confirmPassword) {
            message.error('密码不一致');
            this.setState({password: 'error'});
            this.setState({confirmPassword: 'error'});
            return false;
        } 
        return true;
    }
    
    constructor (props) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            confirmPassword: undefined,
        };
    }
    
    render () {
        const { handleRegister } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        
        return (
            <div style={{
                flex: 1,
            }}>
                <div style={{
                    width: 400,
                    margin: '100px auto',
                    textAlign: 'center',
                }}>
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="用户名："
                            validateStatus={ this.state.username }>
                            <Input type="text" ref="username" placeholder="用户名" onKeyDown={ e => { if(e.keyCode === 13) console.log(this.refs.send.props.onClick()) }}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码："
                             validateStatus={ this.state.password }>
                            <Input type="password" ref="password" placeholder="密码" onKeyDown={ e => { if(e.keyCode === 13) console.log(this.refs.send.props.onClick()) }}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="重复密码："
                             validateStatus={ this.state.confirmPassword }>
                            <Input type="password" ref="confirmPassword" placeholder="重复密码" onKeyDown={ e => { if(e.keyCode === 13) console.log(this.refs.send.props.onClick()) }}/>
                        </FormItem>
                    </Form>
                    <Button 
                        amStyle="primary" 
                        block 
                        ref="send"
                        onClick={ e => {
                            let username = this.refs.username.refs.input.value;
                            let password = this.refs.password.refs.input.value;
                            let confirmPassword = this.refs.confirmPassword.refs.input.value;
                            if (!this.checkValue.bind(this)(username, password, confirmPassword)) {
                                return;
                            }
                            handleRegister(username, password, this);
                        }}
                    >注册</Button>
                </div>
            </div>
        )
    }
}