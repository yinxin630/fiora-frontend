'use strict'

const React = require('react');

import ChatArea from './chatArea.jsx';
import InputArea from './inputArea.jsx';
import TopArea from './topArea.jsx';

export default class ChatForm extends React.Component {
    render () {
        let { user, me } = this.props;
        const { handleSend, handleImageMessageViewer, handleMessageClick } = this.props;
        
        return (
            user ? 
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(253, 255, 255, 0.7)',
            }}>
                <TopArea avatar={ user.avatar } username={ user.nickname || user.username }/>
                <ChatArea messages={ user.messages } me={ me } handleImageMessageViewer={ handleImageMessageViewer } handleMessageClick={ handleMessageClick }/>
                <InputArea handleSend={ message => handleSend(message, 'text', user, user.isGroup) } handleImage={ image => handleSend(image, 'image', user, user.isGroup) }/>
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