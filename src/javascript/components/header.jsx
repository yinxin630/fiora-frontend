'use strict'

const React = require('react');
import { Link } from 'react-router';

const BackgroundColor = '#111111';
const AppNameColor = '#FFFFFF';
const LinkStyle = {
    marginLeft: '10px',
};
const partitionStyle = {
    marginLeft: 30,
}

export default class Header extends React.Component {
    render () {
        let { handleLogout, isLogged } = this.props;
        
        return (
            <div style={{
                backgroundColor: BackgroundColor,
                boxShadow: `0px 0px 10px ${BackgroundColor}`,
            }}>
                <div style={{
                    width: '70%',
                    margin: 'auto',
                    padding: '0px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        padding: '6px 0px',
                        color: AppNameColor,
                    }}>FIORA</h1>
                    <nav style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Link style={LinkStyle} to="/">首页</Link>
                        <Link style={LinkStyle} to="/about">关于</Link>
                        <Link style={LinkStyle} to="/comment">评论</Link>
                        <a style={LinkStyle} href="http://pan.baidu.com/s/1o70hVjs" target="_blank">客户端</a>
                        <a style={LinkStyle} href="http://www.suisuijiang.com" target="_blank">作者</a>
                        <div style={ partitionStyle }/>
                        <Link style={LinkStyle} to="/register">注册</Link>
                        {
                            isLogged ?
                            <Link style={LinkStyle} to="/" onClick={ e => handleLogout() }>注销</Link>
                            :
                            <Link style={LinkStyle} to="/login">登录</Link>
                        }
                    </nav>
                </div>
            </div>
        )
    }
}