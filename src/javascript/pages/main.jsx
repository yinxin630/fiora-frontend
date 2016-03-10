'use strict'

const React = require('react');
import { Link } from 'react-router';
import { Image } from 'amazeui-react';
const Default = require('../default.js');

import Linkman from '../components/linkman.jsx';
import LinkmanForm from '../components/linkmanForm.jsx';
import UserForm from '../components/userForm.jsx';
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
                    <div style={{
                        width: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        borderCollapse: 'collapse',
                        borderRight: '1px solid silver',
                        backgroundColor: 'rgba(253, 255, 255, 0.7)',
                    }}>
                        <UserForm user = {user}/>
                        <LinkmanForm>
                            {
                                user.groups.map((group, index) => {
                                    return <Linkman
                                        key={ index }
                                        avatar={ group.avatar }
                                        nickname={ group.name }
                                        time=""
                                        content=""
                                        handleClick={ () => handleLinkmanClick(group) }
                                    />
                                })
                                
                            }
                        </LinkmanForm>
                    </div>
                    <CurrentLinkman me={ user.id } user={ currentLinkman } handleSend={ handleSend }/>
                </div>
            </div>
        );
    }
}