'use strict'

const React = require('react');

import Avatar from './avatar.jsx';

export default class TopArea extends React.Component {
    render () {
        return (
            <div style={{
                height: '60px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid silver',
                minHeight: 'min-content',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div style={{
                        padding: 10,
                        display: this.props.noNickname ? 'none' : 'block'
                    }}>
                        <Avatar src={ this.props.avatar }
                            width={40} height={40}
                        />
                    </div>
                    <span style={{fontSize: '2rem'}}>{ this.props.username }</span>
                </div>
                <div>
                </div>
            </div>
        );
    }
}