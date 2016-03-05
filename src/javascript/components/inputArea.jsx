'use strict'

const React = require('react');

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
                height: 80,
                display: 'flex',
                minHeight: 'min-content',
            }}>
                <textarea style={{
                    flex: 1,
                    padding: '5px 10px',
                    fontSize: '1.4rem',
                    color: '#5B5B5B',
                }} ref="message" onKeyDown={ e => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        let message = this.getMessage.bind(this)();
                        e.preventDefault();
                        handleSend(message);
                    }
                } } maxLength="512"/>
                <button style={{
                    width: 50,
                    height: 80,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                }} onClick={e => {
                    let message = this.getMessage.bind(this)();
                    handleSend(message);
                }}>
                    发送
                </button>
            </div>
        );
    }
}