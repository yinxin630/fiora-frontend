'use strict'

const React = require('react');
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

export default class Setting extends React.Component {
    render () {
        const { handleSetting } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        
        return (
            <div style={{
                flex: 1,
            }}>
                <div style={{
                    width: 450,
                    margin: '100px auto',
                    textAlign: 'center',
                }}>
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="昵称：">
                            <Input type="text" ref="nickname" placeholder="新昵称" maxLength={12}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="头像：">
                            <Input type="file" ref="avatar" accept="image/*"/>
                        </FormItem>
                    </Form>
                    <Button amStyle="primary" block onClick={ e => {
                        let avatar = this.refs.avatar.refs.input.files[0];
                        if (avatar && avatar.size > 2048000) {
                            this.refs.info.innerText = '文件过大, 请选择小于2MB的文件';
                            return;
                        }
                        
                        let nickname = this.refs.nickname.refs.input.value;
                        if (!avatar) {
                            return handleSetting(nickname, '');
                        }
                        let reader = new FileReader();
                        reader.onloadend = function() {
                            return handleSetting(nickname, this.result);
                        };
                        reader.readAsDataURL(avatar);
                    } }>保存</Button>
                </div>
            </div>
        );
    }
}