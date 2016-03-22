'use strict'

const React = require('react');

export default class Source extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                textAlign: 'center',
                paddingTop: 100,
            }}>
                <label>版本：v1.4.1</label> <br/>
                <label>新增功能: 查看图片原图, 游客提示, 游客消息标注, 注册登录等功能的错误提示优化</label> <br/>
                <label>BUG修复: firefox,safari发图高度为0, 游客不能发消息, 历史消息记录无序, 用户发消息接口bug</label> <br/>
                <br/>
                <img src="../../images/star.png"/> <br/>
                <label>(●'◡'●)ﾉ♥觉得还不错的话欢迎点赞鼓励，↓这俩货就是源码</label> <br/>
                <label>前端：</label><a href="https://github.com/yinxin630/fiora-frontend" target="_blank">fiora-frontend</a> <br/>
                <label>后端：</label><a href="https://github.com/yinxin630/fiora-backend" target="_blank">fiora-backend</a> <br/>
            </div>
        );
    }
}