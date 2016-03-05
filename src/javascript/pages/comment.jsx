'use strict'

const React = require('react');
import { Panel, PanelGroup, Input, Button } from 'amazeui-react';
const Moment = require('moment');
const Default = require('../default.js');

export default class Comment extends React.Component {
    render () {
        const { handleComment } = this.props;
        let { comments } = this.props;
        comments = comments || Default.comments;
        
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
                        console.log(this.refs.comment.getFieldDOMNode());
                        this.refs.comment.getFieldDOMNode().value = '';
                     }}>提交评论</Button>
                </div>
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                }}>
                    <PanelGroup accordion>
                        {
                            comments.map((comment, index, comments) => {
                                return <Panel header={ `${comment.from.nickname || '游客'} ${Moment(comment.time).format('GGGG-MM-DD HH:mm:ss')}` } eventKey={ index }>{ comment.content }</Panel>
                            })
                        }
                    </PanelGroup>
                </div>
            </div>
        );
    }
}