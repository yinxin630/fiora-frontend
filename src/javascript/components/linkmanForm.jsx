'use strict'

const React = require('react');

const BackgroundColor = '#FDFFFF';

export default class LinkmanForm extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                width: '220px',
                display: 'block',
                flexDirection: 'column',
                borderCollapse: 'collapse',
                borderRight: '1px solid silver',
                overflow: 'auto',
                backgroundColor: 'rgba(250, 250, 250, 0.1)',
            }}>
                { this.props.children }
            </div>
        );
    }
}