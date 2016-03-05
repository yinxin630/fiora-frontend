'use strict'

const React = require('react');
import { Image } from 'amazeui-react';
const Moment = require('moment');

export default class Message extends React.Component {
    static defaultProps = {
        avatar: 'http://chat.suisuijiang.com/images/head.png',
        nickname: '默认昵称',
        time: '12:12:12',
        content: '默认消息内容',
        align: 'left',
    }
    
    render () {
        let { align, avatar, nickname, time, content } = this.props;
        content = content.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u0085\u2029)/g, '<br>');
        content = content.replace(/ /g, '&nbsp');
        content = content.replace(/\t/g, '&nbsp&nbsp&nbsp&nbsp');
        content = content.replace(/#\(.+\)/g, r => `<img src="../images/expressions/${r.match(/[^#()]+/)[0]}.png" onerror="this.style.display=\'none\'"/>` );
        
        return (
            <div style={{
                margin: '0px 15px',
                display: 'flex',
                marginTop: 10,
                flexDirection: align !== 'right' || 'row-reverse', 
            }}>
                    <Image src={ this.props.avatar }
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
                </div>
            </div>
        );
    }
}