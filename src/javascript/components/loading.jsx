'use strict';

const React = require('react');

export default class Loading extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(253, 255, 255, 0.7)',
                paddingTop: 250,
                textAlign: 'center'
            }}>
                <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.8)'
                }}> 获取数据中. . .</p>
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                </div>
            </div>
        );
    }
}