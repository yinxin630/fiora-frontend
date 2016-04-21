'use strict';

const React = require('react');
const functions = [
    '支持游客, 支持注册/登录',
    '支持头像修改/保存',
    '支持文字/表情/图片消息',
    '支持群聊/私聊',
    '支持登录用户消息存储',
    '支持新消息桌面通知'
];

export default class Source extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                textAlign: 'center',
                paddingTop: 100
            }}>
                <label style={{fontSize: '1.5rem'}}>版本: v1.5.0</label> <br/>
                <label style={{fontSize: '1.3rem'}}>新增功能: 私聊, 滚动条样式, 通过图片链接直接发图, 关闭应用后登录状态</label> <br/>
                <label style={{fontSize: '1.3rem'}}>BUG修复: 修改消息内容不正确的正则规则, 优化启用消息通知场景</label> <br/>
                <br/>
                <label style={{fontSize: '1.5rem'}}>聊天室功能</label>
                <ul>
                {
                    functions.map(x => <li style={{fontSize: '1.3rem', display: 'list-item', listStyleType: 'disc'}}>{ x }</li>)
                }
                </ul>
                <br/>
                <img src="images/star.png"/> <br/>
                <label style={{fontSize: '1.5rem'}}>(●'◡'●)ﾉ♥觉得还不错的话请帮忙在Github上点个赞，↓这俩货就是源码</label> <br/>
                <label style={{fontSize: '1.5rem'}}>前端：</label><a  style={{fontSize: '1.5rem'}} href="https://github.com/yinxin630/fiora-frontend" target="_blank">fiora-frontend</a> <br/>
                <label style={{fontSize: '1.5rem'}}>后端：</label><a  style={{fontSize: '1.5rem'}} href="https://github.com/yinxin630/fiora-backend" target="_blank">fiora-backend</a> <br/>
            </div>
        );
    }
}