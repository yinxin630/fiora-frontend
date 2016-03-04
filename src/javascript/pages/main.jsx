'use strict'

const React = require('react');

import Body from '../components/Body.jsx';

export default class Main extends React.Component {
    constructor (props, context) {
        super(props, context);
    }
    
    render () {
        const { user, linkmans, linkmanFocus } = this.props;
        const { handleLinkmanClick, handleSend } = this.props;
        return (
            <Body
                user={ user } 
                linkmans={ linkmans }
                linkmanFocus={ linkmanFocus }
                linkmanClick={ handleLinkmanClick }
                handleSend={ handleSend }
            />
        );
    }
}