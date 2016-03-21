'use strict'

const React = require('react');

export default class Avatar extends React.Component {
    render () {
        let { width, height, src, style } = this.props;
        
        return (
            <img style={ Object.assign({
                width,
                height,
                borderRadius: width < height ? width / 2 : height / 2,
            }, style) } src={ src }/>
        );
    }
}