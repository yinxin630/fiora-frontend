'use strict'

const React = require('react');
import Avatar from './avatar.jsx';

export default class Linkman extends React.Component {
    static defaultProps = {
        avatar: 'http://chat.suisuijiang.com/images/head.png',
        nickname: '默认昵称',
        time: '12:12:12',
        content: '默认内容',
        focus: false,
    };
    
    render () {
        let { avatar, nickname, time, content } = this.props;
        const { handleClick } = this.props;
        
        return (
            <div 
                style={{
                    display: 'flex',
                    borderBottom: '1px solid silver',
                    height: 60,
                    backgroundColor: focus ? '' : '',
                }} 
                className="linkman"
                onClick={ handleClick }
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
                            fontSize: '1.2rem',
                        }}>{ nickname }</div>
                        <div style={{
                            fontSize: '1rem',
                            color: '#687275',
                        }}>{ time }</div>
                    </div>
                    <div style={{
                        color: '#687275',
                        fontSize: '1rem',
                    }}>
                        { content }
                    </div>
                </div>
            </div>
        );
    }
}