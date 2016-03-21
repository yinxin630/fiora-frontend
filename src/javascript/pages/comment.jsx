'use strict'

const React = require('react');
import { Input, Button } from 'amazeui-react';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;
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
                    <Input type="textarea" placeholder="添加评论" ref="comment"/>
                    <Button certen amStyle="primary" onClick={ e => {
                        handleComment(this.refs.comment.getValue());
                        this.refs.comment.getFieldDOMNode().value = '';
                     }}>提交评论</Button>
                </div>
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                }}>
                    <Collapse accordion>
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