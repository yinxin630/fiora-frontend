'use strict'

const React = require('react');

export default class ChatForm extends React.Component {
    static defaultProps = {
        paddingBottom: 10,
    }
    
    componentDidUpdate () {
        let form = this.refs.chatform;
        let maxHeight = form.scrollHeight - form.clientHeight;
        if (form.scrollTop >= maxHeight - this.props.paddingBottom - (form.lastElementChild.offsetHeight) || 0) {
            form.scrollTop = maxHeight;
        }
    }
    
    componentDidMount () {
        setTimeout(() => {
            let form = this.refs.chatform;
            form.scrollTop = form.scrollHeight;
        }, 100);
    }
    
    render () {
        return (
            <div style={{
                flex: '1 1 0',
                overflow: 'auto',
                paddingBottom: this.props.paddingBottom,
            }} ref="chatform" id="aa">
                { this.props.children }
            </div>
        );
    }
}