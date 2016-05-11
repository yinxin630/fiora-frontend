'use strict';

import React from 'react';
import Radium from 'radium';
import ExpressionForm from './expressionForm.jsx';
const Once = require('once-event-listener');

class InputArea extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            isShow: false
        };
        this.insertAtCursor = this.insertAtCursor.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleExpression = this.handleExpression.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
    }
    
    render () {
        return (
            <div style={ styles.containner }>
                <ExpressionForm isShow={ this.state.isShow } handleClick={ this.insertAtCursor }/>
                <button style={ [styles.expression, styles.focus] } className="icon" title="表情" onClick={ this.handleExpression }>&#xe603;</button>
                <input style={ styles.selectImage } type="file" ref="image" accept="image/*" onChange={ this.handleSelectImage }/>
                <button style={ [styles.image, styles.focus] } key="image" onClick={ () => this.refs.image.click() } className="icon" title="图片">&#xe600;</button>
                <input type="text" style={ [styles.message, styles.focus] } ref="message" onKeyDown={ this.handleKeyDown } maxLength={ 512 } onFocus={() => this.setState({isShow: false})} onPaste={ this.handlePaste }/>
                <button style={ [styles.send, styles.focus] } className="icon" ref="send" title="发送" onClick={ this.handleSend }>&#xe602;</button>
            </div>
        );
    }
    
    insertAtCursor (myValue) {
        let myField = this.refs.message;
		//IE support
        if (document.selection) {
            myField.focus();
            let sel = document.selection.createRange();
            sel.text = myValue;
            sel.select();
        }
		//MOZILLA/NETSCAPE support
        else if (myField.selectionStart || myField.selectionStart === '0') {
            let startPos = myField.selectionStart;
            let endPos = myField.selectionEnd;
			// save scrollTop before insert
            let restoreTop = myField.scrollTop;
            myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
            if (restoreTop > 0) {
				// restore previous scrollTop
                myField.scrollTop = restoreTop;
            }
            myField.focus();
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        } else {
            myField.value += myValue;
            myField.focus();
        }
    }
    
    getMessage () {
        let input = this.refs.message;
        let message = input.value;
        input.value = '';
        return message;
    }
    
    handleSend () {
        let message = this.getMessage().trim();
        if (message.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif|.jpeg|.bmp)$/i)) {
            let img = new Image();
            img.src = message;
            
            return img.onload = () => {
                return this.props.handleImage({
                    image: message,
                    width: img.width,
                    height: img.height
                });
            };
        }
        this.props.handleSend({text: message});
    }
    
    handleExpression () {
        this.setState({isShow: !this.state.isShow});
        Once(document.body, 'click', () => {
            this.setState({isShow: false});
        });
    }
    
    handleSelectImage () {
        const { handleImage } = this.props;
        let image = this.refs.image.files[0];
        if (!image) {
            return;
        }
        
        let reader = new FileReader();
        reader.onloadend = function() {
            let img = new Image();
            img.src = this.result;
            
            return img.onload = () => {
                return handleImage({
                    image: this.result,
                    width: img.width,
                    height: img.height
                });
            };
        };
        reader.readAsDataURL(image);
    }
    
    handleKeyDown (e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            this.refs.send.click();
        }
    }
    
    handlePaste (e) {
        const { handleImage } = this.props;
        
        let items = (e.clipboardData || e.originalEvent.clipboardData).items;
        
        // 如果包含文件内容
        if (e.clipboardData.types.indexOf('Files') > -1) {
            for (let index = 0; index < items.length; index++) {
                let item = items[index];
                if (item.kind === 'file' && item.type.match(/^image/)) {
                    let reader = new FileReader();
                    reader.onloadend = function() {
                        let img = new Image();
                        img.src = this.result;
                        
                        return img.onload = () => {
                            return handleImage({
                                image: this.result,
                                width: img.width,
                                height: img.height
                            });
                        };
                    };
                    reader.readAsDataURL(item.getAsFile());
                }
            }
            e.preventDefault();
        }
    }
}

export default Radium(InputArea);

const styles = {
    containner: {
        height: 60,
        minHeight: 'min-content',
        margin: 'auto',
        padding: '10px 0px 16px 0px',
        display: 'flex',
        position: 'relative'
    },
    
    focus: {
        ':focus': {
            border: 'none',
            boxShadow: '0 0 5px #666'
        }
    },
    
    expression: {
        height: 34,
        width: 50,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: 'inherit',
        color: '#8E8E8E',
        border: '1px solid #aaaaaa',
        fontSize: 22,
        outline: 'none !important'
    },
    
    image: {
        height: 34,
        width: 50,
        backgroundColor: 'inherit',
        color: '#8E8E8E',
        border: '1px solid #aaaaaa',
        fontSize: 22,
        outline: 'none !important'
    },
    
    send: {
        height: 34,
        width: 50,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'inherit',
        color: '#8E8E8E',
        border: '1px solid #aaaaaa',
        fontSize: 22,
        outline: 'none !important'
    },
    
    message: {
        height: 34,
        width: 400,
        border: '1px solid #aaaaaa',
        backgroundColor: 'inherit',
        padding: '0px 5px',
        outline: 'none !important'
    },
    
    selectImage: {
        display: 'none'
    }
};