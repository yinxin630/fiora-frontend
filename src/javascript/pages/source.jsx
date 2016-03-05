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
                <img src="../../images/star.png"/> <br/>
                <label>(●'◡'●)ﾉ♥觉得还不错的话欢迎点赞鼓励</label> <br/>
                <label>前端：</label><a href="https://github.com/yinxin630/fiora-frontend" target="_blank">fiora-frontend</a> <br/>
                <label>后端：</label><a href="https://github.com/yinxin630/fiora-backend" target="_blank">fiora-backend</a> <br/>
            </div>
        );
    }
}