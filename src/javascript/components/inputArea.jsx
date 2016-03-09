'use strict'

const React = require('react');
import ExpressionForm from './expressionForm.jsx';

export default class InputArea extends React.Component {
    getMessage () {
        let input = this.refs.message;
        let message = input.value;
        input.value = '';
        return message;
    }
    
    render () {
        const { handleSend } = this.props;
        
        return (
            <div style={{
                height: 50,
                minHeight: 'min-content',
                margin: 'auto',
                padding: 10,
            }}>
                <ExpressionForm/>
                <button style={{
                    height: 30,
                    width: 50,
                    borderBottomLeftRadius: 15,
                    borderTopLeftRadius: 15,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                    border: '1px solid #e0e0e0',
                }} className="am-icon-smile-o am-icon-md"></button>
                <input type="text" style={{
                    height: 30,
                    width: 300,
                    border: '1px solid #e0e0e0',
                }} className="input-message" ref="message" onKeyDown={ e => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        let message = this.getMessage.bind(this)();
                        e.preventDefault();
                        handleSend(message);
                    }
                } } maxLength={ 512 }/>
                <button style={{
                    height: 30,
                    width: 50,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                    border: '1px solid #e0e0e0',
                }} onClick={e => {
                    let message = this.getMessage.bind(this)();
                    handleSend(message);
                }}>发送</button>
            </div>
        );
    }
}