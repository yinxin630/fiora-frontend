'use strict'

const React = require('react');
import { Image } from 'amazeui-react';

export default class UserForm extends React.Component {
    render () {
        let { user } = this.props;
        
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
                    <Image style ={{
                        margin: 10,
                    }} src={ user.avatar }
                        width={60} height={60} circle
                    />
                    <span>
                        { user.nickname }
                    </span>
                </div>
                <a style={{
                    marginRight: 5,
                    color: '#333333',
                    cursor: 'pointer',
                }}className="am-icon-gear am-icon-md">
                </a>
            </div>
        );
    }
}