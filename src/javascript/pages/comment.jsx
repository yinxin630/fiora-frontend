'use strict'

const React = require('react');
import { Collapse, Form, Input, Button, message } from 'antd';
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Moment = require('moment');

export default class Comment extends React.Component {
    componentDidMount () {
        this.props.getComment();
    }
    
    render () {
        const { handleComment } = this.props;
        let { comments } = this.props;
        
        return (
            <div style={{
                margin: '50px 15%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: 30,
                }}>
                    <Form horizontal>
                        <FormItem>
                            <Input type="textarea" placeholder="请输入评论" ref="comment"/>
                        </FormItem>
                        <Button certen amStyle="primary" onClick={ e => {
                            handleComment(this.refs.comment.refs.input.value);
                            this.refs.comment.refs.input.value = '';
                        }}>提交评论</Button>
                     </Form>
                </div>
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                }}>
                    <Collapse accordion defaultActiveKey={['0']}>
                        {
                            comments.map((comment, index, comments) => {
                                return (
                                    <Panel header={ `${comment.from.nickname || '游客'} ${Moment(comment.time).format('GGGG-MM-DD HH:mm:ss')}` } key={ index }>
                                        <p>{ comment.content }</p>
                                    </Panel>
                                );
                            })
                        }
                    </Collapse>
                </div>
            </div>
        );
    }
}