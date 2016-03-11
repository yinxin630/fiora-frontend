'use strict'

const React = require('react');

import ControlForm from '../components/controlForm.jsx';
import ChatForm from '../components/chatForm.jsx';

export default class Main extends React.Component {
    render () {
        let { user, currentLinkman } = this.props;
        const { handleLinkmanClick, handleSend } = this.props;
        
        return (
            <div style={{
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url("../../images/background.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    minWidth: 900,
                    width: '80%',
                    margin: '0px auto',
                }}>
                    <ControlForm user={ user }/>
                    <ChatForm me={ user.id } user={ currentLinkman } handleSend={ handleSend }/>
                </div>
            </div>
        );
    }
}