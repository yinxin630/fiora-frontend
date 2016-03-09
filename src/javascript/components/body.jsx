'use strict'

const React = require('react');
import { Link } from 'react-router';
const Default = require('../default.js');

import Linkman from './linkman.jsx';
import LinkmanForm from './linkmanForm.jsx';
import User from './user.jsx';
import Sidebar from './sidebar.jsx';
import CurrentLinkman from './currentLinkman.jsx';

export default class Body extends React.Component {
    render () {
        const { handleSend, handleLinkmanClick } = this.props;
        let { user, currentLinkman } = this.props;
        user = user || Default.user;
        currentLinkman = currentLinkman || Default.currentLinkman;
        
        return (
            <div style={{
                flex: 1,
                display: 'flex',
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
                <CurrentLinkman me={ user.id } user={ currentLinkman } handleSend={ handleSend }/>
            </div>
        )
    }
}