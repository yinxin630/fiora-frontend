'use strict'

const React = require('react');

import Body from '../components/Body.jsx';

export default class Main extends React.Component {
    constructor (props, context) {
        super(props, context);
    }
    
    render () {
        let { user, currentLinkman } = this.props;
        const { handleLinkmanClick, handleSend } = this.props;
        return (
            <Body
                user={ user } 
                currentLinkman={ currentLinkman }
                handleLinkmanClick={ handleLinkmanClick }
                handleSend={ handleSend }
            />
        );
    }
}