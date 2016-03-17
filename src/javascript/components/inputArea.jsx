'use strict'

const React = require('react');
import ExpressionForm from './expressionForm.jsx';

export default class InputArea extends React.Component {
    insertAtCursor (myValue) {
		var myField = this.refs.message;
		//IE support
		if (document.selection) {
			myField.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			sel.select();
		}
		//MOZILLA/NETSCAPE support
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			// save scrollTop before insert
			var restoreTop = myField.scrollTop;
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
    
    constructor (props, context) {
        super(props, context);
        this.state = {
            isShow: false,
        };
    }
    
    render () {
        const { handleSend, handleImage } = this.props;
        
        return (
            <div style={{
                height: 60,
                minHeight: 'min-content',
                margin: 'auto',
                padding: '10px 0px 16px 0px',
            }}>
                <ExpressionForm isShow={ this.state.isShow } handleClick={ this.insertAtCursor.bind(this) }/>
                <button style={{
                    height: 34,
                    width: 50,
                    borderBottomLeftRadius: 15,
                    borderTopLeftRadius: 15,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                    border: '1px solid #aaaaaa',
                }} className="am-icon-smile-o am-icon-sm"
                    onClick={() => this.setState({isShow: !this.state.isShow})}
                ></button>
                <input style={{ display: 'none' }} type="file" ref="image" accept="image/*"
                    onChange={ e => {
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
                                    height: img.height,
                                });
                            }
                        };
                        reader.readAsDataURL(image);
                    } }
                />
                <button style={{
                    height: 34,
                    width: 50,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                    border: '1px solid #aaaaaa',
                }} className="am-icon-image am-icon-sm"
                    onClick={ e => this.refs.image.click() }
                ></button>
                <input 
                    type="text" 
                    style={{
                        height: 34,
                        width: 400,
                        border: '1px solid #aaaaaa',
                        backgroundColor: 'inherit',
                        padding: '0px 5px',
                    }} 
                    className="input-message"
                    ref="message" 
                    onKeyDown={ e => {
                        if (e.keyCode === 13 && !e.shiftKey) {
                            let message = this.getMessage.bind(this)();
                            e.preventDefault();
                            handleSend(message);
                        }
                    } } 
                    maxLength={ 512 }
                    onFocus={() => this.setState({isShow: false})}/>
                <button style={{
                    height: 34,
                    width: 50,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                    border: '1px solid #aaaaaa',
                }} onClick={e => {
                    let message = this.getMessage.bind(this)();
                    handleSend(message);
                }}>发送</button>
            </div>
        );
    }
}