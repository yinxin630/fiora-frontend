'use strict'

const React = require('react');
const Moment = require('moment');

import Avatar from './avatar.jsx';

export default class Message extends React.Component {
    showMessage (content, type) {
        if (type === 'text') {
            return (
                <div
                    style={{
                        padding: '3px 10px',
                        wordBreak: 'break-all',
                        border: '1px solid blue',
                        boxShadow: '0px 0px 3px',
                        borderRadius: 10,
                        display: 'inline-block',
                        fontSize: '1.5rem',
                    }} dangerouslySetInnerHTML={ {__html: content.text} }>
                </div>
            );
        }
        else if (type === 'image') {
            const MessageContentMaxWidth = 458;
            
            return (
                <div
                    style={{
                        padding: '3px 10px',
                        wordBreak: 'break-all',
                        border: '1px solid blue',
                        boxShadow: '0px 0px 3px',
                        borderRadius: 10,
                        display: 'inline-block',
                    }}>
                    <img 
                        width="100%" 
                        height={ content.width > MessageContentMaxWidth ? MessageContentMaxWidth / content.width * content.height : content.height } 
                        src={ content.image }
                        onDoubleClick={e => {
                            this.props.handleDoubleClick(content.image);
                        }}
                    />
                </div>
            );
        }
    }
    
    static defaultProps = {
        avatar: 'http://chat.suisuijiang.com/images/head.png',
        nickname: '默认昵称',
        time: '12:12:12',
        content: '默认消息内容',
        align: 'left',
    }
    
    render () {
        let { align, avatar, nickname, time, content, type} = this.props;
        let copyCotent = Object.assign({}, content);
        if (type === 'text') {
            let text = copyCotent.text;
            text = text.replace(/ /g, '&nbsp');
            text = text.replace(/\t/g, '&nbsp&nbsp&nbsp&nbsp');
            text = text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, r => `<a href="${r}"" target="_blank">${r}</a>`);
            text = text.replace(/#\([\u4e00-\u9fa5a-z]+\)/g, r => `<img src="../images/expressions/${r.match(/[^#()]+/)[0]}.png" onerror="this.style.display=\'none\'"/>` );
            copyCotent.text = text;
        }
        
        return (
            <div style={{
                margin: '0px 15px',
                display: 'flex',
                marginTop: 10,
                flexDirection: align !== 'right' || 'row-reverse', 
            }}>
                <Avatar src={ avatar }
                    width={40} height={40}
                />
                <div style={{
                    width: 'calc(100% - 40px * 2)',
                    maxWidth: '500px',
                    padding: '0px 10px',
                    display: 'flex',
                    alignItems: align === 'left' ? 'flex-start' : 'flex-end',
                    flexDirection: 'column',
                }}>
                    <div style={{
                    }}>
                        <span style={{
                            fontSize: '1.5rem',
                        }}>
                            { nickname }
                        </span>
                        <span style={{
                            marginLeft: 5,
                            fontSize: '1.2rem',
                        }}>
                            { Moment(time).format('MM/DD hh:mm:ss A') }
                        </span>
                    </div>
                    {
                        this.showMessage(copyCotent, type)
                    }
                </div>
            </div>
        );
    }
}