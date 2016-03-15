'use strict'

const React = require('react');
import { Form, fieldset, Input, Button } from 'amazeui-react';

export default class Setting extends React.Component {
    render () {
        const { handleSetting } = this.props;
        
        return (
            <div style={{
                flex: 1,
            }}>
                <div style={{
                    width: 350,
                    margin: '100px auto',
                    textAlign: 'center',
                }}>
                    <Form>
                        <span style={{
                            color: 'red',
                        }} ref="info">
                        </span>
                        <fieldset className="am-form-set">
                            <Input type="text" placeholder="昵称" icon="user" ref="nickname" maxLength={8}/>
                            <Input type="file" label="头像" id="avatar" accept="image/*"/>
                            <Button amStyle="primary" block onClick={ e => {
                                let avatar = document.querySelector('#avatar').files[0];
                                if (avatar || avatar.size > 2048000) {
                                    this.refs.info.innerText = '文件过大, 请选择小于2MB的文件';
                                    return;
                                }
                                
                                let nickname = this.refs.nickname.getValue();
                                if (!avatar) {
                                    return handleSetting(nickname, '');
                                }
                                let reader = new FileReader();
                                reader.onloadend = function() {
                                    return handleSetting(nickname, this.result);
                                };
                                reader.readAsDataURL(avatar);
                            } }>保存</Button>
                        </fieldset>
                    </Form>
                </div>
            </div>
        );
    }
}