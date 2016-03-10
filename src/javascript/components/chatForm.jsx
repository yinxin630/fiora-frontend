'use strict'

const React = require('react');

import ChatArea from './chatArea.jsx';
import InputArea from './inputArea.jsx';
import TopArea from './topArea.jsx';

export default class ChatForm extends React.Component {
    getMessages (linkman, userId) {
        if (!linkman) {
            return;
        }
        return linkman.messages.map(message => {
            return <Message
                avatar={ linkman.avatar }
                nickname={ linkman.nickname }
                time={ message.time }
                content={ message.content }
                align={ linkman.id === userId ? 'right' : 'left' }
            />
        });
    }
    
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
                <ChatArea messages={ user.messages } me={ user.id }/>
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