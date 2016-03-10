'use strict'

const React = require('react');

import Linkman from '../components/linkman.jsx';
import LinkmanForm from '../components/linkmanForm.jsx';
import UserForm from '../components/userForm.jsx';

export default class ControlForm extends React.Component {
    render () {
        let { user } = this.props;
        
        return (
            <div style={{
                width: 220,
                display: 'flex',
                flexDirection: 'column',
                borderCollapse: 'collapse',
                borderRight: '1px solid silver',
                backgroundColor: 'rgba(253, 255, 255, 0.7)',
            }}>
                <UserForm user = {user}/>
                <LinkmanForm>
                    {
                        user.groups.map((group, index) => {
                            return <Linkman
                                key={ index }
                                avatar={ group.avatar }
                                nickname={ group.name }
                                time=""
                                content=""
                                handleClick={ () => handleLinkmanClick(group) }
                            />
                        })
                        
                    }
                </LinkmanForm>
            </div>
        );
    }
}