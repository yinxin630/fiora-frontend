'use strict';

const Action = require('./action.js');
import { combineReducers, createStore } from 'redux';

function reducer(state = {}, action) {
    switch (action.type) {
    case Action.types.SetToken: {
        return Object.assign({}, state, {token: action.token});
    }
    case Action.types.SetUser: {
        return Object.assign({}, state, {user: action.user});
    }
    case Action.types.SetUserInfo: {
        state.user.avatar = action.user.avatar;
        return Object.assign({}, state);
    }
    case Action.types.AddLinkman: {
        if (!state.user.linkmans.find(x => x.id === action.user.id)) {
            action.user.messages = action.user.messages || [];
            state.user.linkmans.push(action.user);
        }
        return Object.assign({}, state);
    }
    case Action.types.SetCurrentLinkman: {
        state.currentLinkman = action.user;
        state.currentLinkman.isGroup = action.isGroup;
        return Object.assign({}, state);
    }
    case Action.types.SetLoginStatus: {
        state.isLogged = action.status;
        return Object.assign({}, state);
    }
    case Action.types.AddGroupMessage: {
        let group = state.user.groups.find(x => x.id === action.group.id);
        group.messages = group.messages || [];
        group.messages.push(action.message);
        return Object.assign({}, state);
    }
    case Action.types.AddUserMessage: {
        let user = state.user.linkmans.find(x => x.id === action.user);
        if (!user) {
            state.user.linkmans.push(action.message.from);
            user = state.user.linkmans.find(x => x.id === action.user);
        }
        user.messages = user.messages || [];
        user.messages.push(action.message);
        return Object.assign({}, state);
    }
    case Action.types.SetWindowVisible: {
        state.windowVisible = action.status;
        return Object.assign({}, state);
    }
    case Action.types.SetComments: {
        state.comments = action.comments;
        return Object.assign({}, state);
    }
    default:
        return state;
    }
}
let reducers = combineReducers({ reducer });

module.exports = createStore(reducers);

// let unsubscribe = Store.subscribe(() =>
//     console.log('store监控', store.getState())
// );