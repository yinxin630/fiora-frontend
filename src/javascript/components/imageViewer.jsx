'use strict';

const React = require('react');

export default class ImageViewer extends React.Component {
    render () {
        let { display, src } = this.props;
        const { handleClose } = this.props;
        
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                display: display ? 'flex' : 'none'
            }}>
                <div style={{
                    maxWidth: '80vw',
                    maxHeight: '80vh',
                    margin: 'auto',
                    overflow: 'scroll'
                }}>
                    <img 
                        style={{
                           
                        }}
                        src={ src }/>
                </div>
                <div className="icon"
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 10,
                        color: 'white',
                        fontSize: 44,
                        cursor: 'pointer'
                    }}
                    onClick={ handleClose }
                >
                    &#xe606;
                </div>
            </div>
        );
    }
}