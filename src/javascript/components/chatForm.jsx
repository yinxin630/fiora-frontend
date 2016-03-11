'use strict'

const React = require('react');

import ChatArea from './chatArea.jsx';
import InputArea from './inputArea.jsx';
import TopArea from './topArea.jsx';

export default class ChatForm extends React.Component {
    render () {
        let { user, me } = this.props;
        const { handleSend } = this.props;
        
        return (
            user ? 
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(253, 255, 255, 0.7)',
            }}>
                <TopArea avatar={ user.avatar } nickname={ user.name }/>
                <ChatArea messages={ user.messages } me={ me }/>
                <InputArea handleSend={ message => handleSend(message, user) }/>
            </div>
            :
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FDFFFF',
            }}>
            </div>
        );
    }
}