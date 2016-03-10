'use strict'

const React = require('react');

import Message from './message.jsx';

export default class ChatArea extends React.Component {
    static defaultProps = {
        paddingBottom: 10,
    }
    
    componentDidUpdate () {
        let form = this.refs.chatform;
        let maxHeight = form.scrollHeight - form.clientHeight;
        if (form.scrollTop >= maxHeight - this.props.paddingBottom - ((form.lastElementChild.offsetHeight) || 0) - 5) {
            form.scrollTop = form.scrollHeight;
        }
    }
    
    componentDidMount () {
        setTimeout(() => {
            let form = this.refs.chatform;
            form.scrollTop = form.scrollHeight;
        }, 100);
    }
    
    render () {
        let { messages, me } = this.props;
        
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
                            avatar={ message.from.avatar }
                            nickname={ message.from.nickname }
                            time={ message.time }
                            content={ message.content }
                            align={ message.from.id === me ? 'right' : 'left' }
                        />
                    })
                }
            </div>
        );
    }
}