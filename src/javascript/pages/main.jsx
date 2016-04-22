'use strict'

const React = require('react');

import ControlForm from '../components/controlForm.jsx';
import ChatForm from '../components/chatForm.jsx';
import Loading from '../components/loading.jsx';

export default class Main extends React.Component {
    render () {
        let { user, currentLinkman } = this.props;
        const { handleLinkmanClick, handleSend, handleImageMessageViewer, handleMessageClick } = this.props;
        
        return (
            <div style={{
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url("images/background.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                minWidth: 540
            }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    minWidth: 900,
                    width: '80%',
                    margin: '0px auto'
                }}>
                    <ControlForm user={ user } handleLinkmanClick={ handleLinkmanClick }/>
                    {
                        currentLinkman ?
                        <ChatForm me={ user.id } user={ currentLinkman } handleSend={ handleSend } handleImageMessageViewer={ handleImageMessageViewer } handleMessageClick={ handleMessageClick }/>
                        :
                        <Loading/>
                    }
                </div>
            </div>
        );
    }
}