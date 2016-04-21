'use strict'

const React = require('react');

import Message from './message.jsx';

export default class ChatArea extends React.Component {
    static defaultProps = {
        paddingBottom: 10,
    }
    
    componentDidUpdate () {
        let needScroll = false;
        let form = this.refs.chatform;
        let lastMessage = this.props.messages[this.props.messages.length - 1];
        if (lastMessage && lastMessage.from.id === this.props.me) {
            needScroll = true;
        }
        if (form.scrollTop === 0) {
            needScroll = true;
        }
        let maxHeight = form.scrollHeight - form.clientHeight;
        let lastElement = form.lastElementChild;
        if (lastElement && form.scrollTop >= maxHeight - this.props.paddingBottom - lastElement.offsetHeight - 20) {
            needScroll = true;
        }
        
        if (needScroll) {
            setTimeout(() => {
                form.scrollTop = form.scrollHeight;
            }, 100);
        }
    }
    
    componentDidMount () {
        let form = this.refs.chatform;
        setTimeout(() => {
            form.scrollTop = form.scrollHeight;
        }, 100);
    }
    
    render () {
        let { messages, me } = this.props;
        const { handleImageMessageViewer, handleMessageClick } = this.props;
        
        return (
            <div style={{
                flex: '1 1 0',
                overflow: 'auto',
                paddingBottom: this.props.paddingBottom,
            }} ref="chatform" id="aa">
                {
                    messages.map((message, index) => {
                        return <Message
                            key={ index }
                            from={ message.from }
                            avatar={ message.from.avatar }
                            username={ message.from.username }
                            time={ message.time }
                            content={ message.content }
                            type={ message.type }
                            align={ message.from.id === me ? 'right' : 'left' }
                            handleDoubleClick={ handleImageMessageViewer }
                            handleMessageClick= { handleMessageClick }
                        />
                    })
                }
            </div>
        );
    }
}