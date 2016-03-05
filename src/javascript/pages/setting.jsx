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
                            <Input type="text" placeholder="昵称" icon="user" ref="nickname" maxlength="10"/>
                            <Input type="file" label="头像" id="avatar"/>
                            <Button amStyle="primary" block onClick={ e => {
                                let avatar = document.querySelector('#avatar').files[0];
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