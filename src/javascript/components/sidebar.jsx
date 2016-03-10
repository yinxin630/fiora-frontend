'use strict'

const React = require('react');

export default class Sidebar extends React.Component {
    render () {
        return (
            <div style={{
                width: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid silver',
                backgroundColor: 'rgba(224, 224, 224, 0.7)',
            }}>
                { this.props.children }
            </div>
        );
    }
}