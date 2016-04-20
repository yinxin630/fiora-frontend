'use strict'

const React = require('react');
const Moment = require('moment');

import Linkman from '../components/linkman.jsx';

export default class LinkmanForm extends React.Component {
    render () {
        let { groups, linkmans } = this.props;
        const { handleLinkmanClick } = this.props;
        
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
                        let lastMessage = group.messages[group.messages.length - 1] || {time: Date.now(), content: {text: ''}, type: 'text'};
                        
                        return <Linkman
                            key={ index }
                            avatar={ group.avatar }
                            username={ group.nickname }
                            time={ Moment(lastMessage.time).format('HH:mm') }
                            content={ lastMessage.content.text.slice(0, 12) }
                            onClick={ () => handleLinkmanClick(group, true) }
                        />;
                    })
                }
                {
                    linkmans.map((linkman, index) => {
                        let lastMessage = linkman.messages[linkman.messages.length - 1] || {time: Date.now(), content: {text: ''}, type: 'text'};
                        
                        return <Linkman key={ index } avatar={ linkman.avatar } username={ linkman.username } time={ Moment(lastMessage.time).format('HH:mm') } content={ lastMessage.content.text.slice(0, 12) } onClick={ () => handleLinkmanClick(linkman, false) }/>;
                    })
                }
            </div>
        );
    }
}