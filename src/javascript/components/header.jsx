'use strict'

const React = require('react');
import { Link } from 'react-router';
const Default = require('../default.js');

const BackgroundColor = '#272727';
const AppNameColor = '#FFFFFF';
const LinkStyle = {
    marginLeft: '10px',
};
const partitionStyle = {
    marginLeft: 40,
}

export default class Header extends React.Component {
    render () {
        let { handleLogout, isLogged } = this.props;
        isLogged = isLogged || Default.isLogged;
        
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