module.exports = {
    types: {
        SetUser: 'SetUser',
        SetUserInfo: 'SetUserInfo',
        AddLinkman: 'AddLinkman',
        SetCurrentLinkman: 'SetCurrentLinkman',
        SetLoginStatus: 'SetLoginStatus',
        AddGroupMessage: 'AddGroupMessage',
        SetWindowVisible: 'SetWindowVisible',
        SetComments: 'SetComments'
    },
    
    setUser: function (user) {
        return {
            type: this.types.SetUser,
            user: user
        };
    },
    
    setUserInfo: function (user) {
        return {
            type: this.types.SetUserInfo,
            user: user
        };
    },
    
    addLinkman: function (user) {
        return {
            type: this.types.AddLinkman,
            user: user
        };
    },
    
    setCurrentLinkman: function (user) {
        return {
            type: this.types.SetCurrentLinkman,
            user: user
        };
    },
    
    setLoginStatus: function (status) {
        return {
            type: this.types.SetLoginStatus,
            status: status
        };
    },
    
    addGroupMessage: function (group, message) {
        return {
            type: this.types.AddGroupMessage,
            group: group,
            message: message
        };
    },
    
    setWindowVisible: function (status) {
        return {
            type: this.types.SetWindowVisible,
            status: status
        };
    },
    
    setComments: function (comments) {
        return {
            type: this.types.SetComments,
            comments: comments
        };
    }
};