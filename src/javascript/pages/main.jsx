'use strict'

const React = require('react');
import { Link } from 'react-router';
const Default = require('../default.js');

import Linkman from '../components/linkman.jsx';
import LinkmanForm from '../components/linkmanForm.jsx';
import User from '../components/user.jsx';
import Sidebar from '../components/sidebar.jsx';
import CurrentLinkman from '../components/currentLinkman.jsx';

export default class Main extends React.Component {
    constructor (props, context) {
        super(props, context);
    }
    
    render () {
        let { user, currentLinkman } = this.props;
        const { handleLinkmanClick, handleSend } = this.props;
        user = user || Default.user;
        currentLinkman = currentLinkman || Default.currentLinkman;
        
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
                    <Sidebar>
                        <User 
                            nickname={ user.nickname }
                            avatar={ user.avatar }
                        />
                        <nav 
                            style={{
                                flex: 1,
                                marginTop: '100px',
                            }}
                        >
                            <Link to="setting">用户设置</Link>
                        </nav>
                    </Sidebar>
                    <CurrentLinkman me={ user.id } user={ currentLinkman } handleSend={ handleSend }/>
                </div>
            </div>
        );
    }
}