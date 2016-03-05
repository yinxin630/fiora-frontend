'use strict'

const React = require('react');
import { Panel, PanelGroup, Input, Button } from 'amazeui-react';

export default class Comment extends React.Component {
    render () {
        return (
            <div style={{
                margin: '50px 15%',
                
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: 30,
                }}>
                    <Input type="textarea"/>
                    <Button certen amStyle="primary">提交评论</Button>
                </div>
                <PanelGroup accordion>
                    <Panel header="面板 1" eventKey="1">面板 1 内容</Panel>
                    <Panel header="面板 2" eventKey="2">面板 2 内容</Panel>
                </PanelGroup>
            </div>
        );
    }
}