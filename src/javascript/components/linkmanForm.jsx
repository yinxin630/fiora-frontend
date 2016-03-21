'use strict'

const React = require('react');
const Moment = require('moment');

import Linkman from '../components/linkman.jsx';

export default class LinkmanForm extends React.Component {
    render () {
        let { groups } = this.props;
        
        return (
            <div style={{
                flex: 1,
                width: '220px',
                display: 'block',
                flexDirection: 'column',
                borderCollapse: 'collapse',
                borderRight: '1px solid silver',
                overflow: 'auto',
                backgroundColor: 'rgba(250, 250, 250, 0.1)',
            }}>
                {
                    groups.map((group, index) => {
                        let lastMessage = group.messages[group.messages.length - 1] || {time: '', content: {text: ''}, type: 'text'};
                        
                        return <Linkman
                            key={ index }
                            avatar={ group.avatar }
                            nickname={ group.name }
                            time={ Moment(lastMessage.time).format('HH:mm') }
                            content={ lastMessage.type === 'image' ? '<image>' : lastMessage.content.text.slice(0, 12) }
                            handleClick={ () => handleLinkmanClick(group) }
                        />
                    })
                }
            </div>
        );
    }
}