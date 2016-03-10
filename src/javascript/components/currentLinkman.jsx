'use strict'

const React = require('react');

import ChatArea from './chatArea.jsx';
import InputArea from './inputArea.jsx';
import Topbar from './topbar.jsx';
import Message from './message.jsx';

export default class CurrentLinkman extends React.Component {
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
                <Topbar
                    avatar={ user.avatar }
                    nickname={ user.name }
                />
                <ChatArea>
                {
                    user.messages.map((message, index) => {
                        return <Message
                            key={ index }
                            avatar={ message.from.avatar }
                            nickname={ message.from.nickname }
                            time={ message.time }
                            content={ message.content }
                            align={ message.from.id === me ? 'right' : 'left' }
                        />
                    })
                }
                </ChatArea>
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