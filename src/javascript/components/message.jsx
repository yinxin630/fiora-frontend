'use strict'

const React = require('react');
import { Image } from 'amazeui-react';
const Moment = require('moment');

export default class Message extends React.Component {
    showMessage (content, type, width, height) {
        if (!type || type === 'text') {
            return (
                <div
                    style={{
                        padding: '3px 10px',
                        wordBreak: 'break-all',
                        border: '1px solid blue',
                        boxShadow: '0px 0px 3px',
                        borderRadius: 10,
                        display: 'inline-block',
                    }} dangerouslySetInnerHTML={ {__html: content} }>
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
                    <img width="100%" height={ width > MessageContentMaxWidth ? MessageContentMaxWidth / width * height : height } src={ content }/>
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
        let { align, avatar, nickname, time, content, type, width, height } = this.props;
        if (type === 'text') {
            content = content.replace(/ /g, '&nbsp');
            content = content.replace(/\t/g, '&nbsp&nbsp&nbsp&nbsp');
            content = content.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, r => `<a href="${r}"" target="_blank">${r}</a>`);
            content = content.replace(/#\([\u4e00-\u9fa5a-z]+\)/g, r => `<img src="../images/expressions/${r.match(/[^#()]+/)[0]}.png" onerror="this.style.display=\'none\'"/>` );
        }
        
        return (
            <div style={{
                margin: '0px 15px',
                display: 'flex',
                marginTop: 10,
                flexDirection: align !== 'right' || 'row-reverse', 
            }}>
                    <AMImage src={ this.props.avatar }
                    width={40} height={40} circle
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
                            fontSize: '1.4rem',
                        }}>
                            { nickname }
                        </span>
                        <span style={{
                            marginLeft: 5,
                            fontSize: '1rem',
                        }}>
                            { Moment(time).format('MM/DD hh:mm:ss A') }
                        </span>
                    </div>
                    {
                        this.showMessage(content, type, width, height)
                    }
                </div>
            </div>
        );
    }
}