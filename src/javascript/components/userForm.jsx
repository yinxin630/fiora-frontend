'use strict'

const React = require('react');
import { Link } from 'react-router';

import Avatar from './avatar.jsx';

export default class UserForm extends React.Component {
    render () {
        let { avatar, nickname } = this.props;
        
        return (
            <div style={{
                height: 120,
                borderCollapse: 'collapse',
                borderBottom: '1px solid silver',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar style ={{
                        margin: 10,
                    }} src={ avatar }
                        width={60} height={60}
                    />
                    <span style={{fontSize: '1.5rem'}}>
                        { nickname }
                    </span>
                </div>
                <Link to="setting" style={{
                    marginRight: 5,
                    color: '#333333',
                    cursor: 'pointer',
                    fontSize: 34,
                }} className="icon">
                    &#xe658;
                </Link>
            </div>
        );
    }
}