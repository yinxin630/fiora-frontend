'use strict'

const React = require('react');
import Avatar from './avatar.jsx';

export default class Linkman extends React.Component {
    render () {
        let { avatar, username, time, content } = this.props;
        const { onClick } = this.props;
        
        return (
            <div 
                style={{
                    display: 'flex',
                    borderBottom: '1px solid silver',
                    height: 60,
                    backgroundColor: focus ? '' : ''
                }} 
                className="linkman"
                onClick={ onClick }
            >
                <div style={{
                    padding: '10px',
                }}>
                    <Avatar src={ avatar }
                        width={40} height={40}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    padding: '10px 10px 10px 0px',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            fontSize: '1.3rem',
                            color: '#687275',
                        }}>{ username }</div>
                        <div style={{
                            color: '#687275',
                        }}>{ time }</div>
                    </div>
                    <div style={{
                        color: '#687275',
                        fontSize: '1.1rem',
                    }}>
                        { content }
                    </div>
                </div>
            </div>
        );
    }
}