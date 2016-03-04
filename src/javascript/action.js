module.exports = {
    types: {
        SetUser: 'SetUser',
        SetUserInfo: 'SetUserInfo',
        SetCurrentLinkman: 'SetCurrentLinkman',
        SetLoginStatus: 'SetLoginStatus',
        AddGroupMessage: 'AddGroupMessage',
    },
    
    setUser: function (user) {
        return {
            type: this.types.SetUser,
            user: user,
        };
    },
    
    setUserInfo: function (user) {
        return {
            type: this.types.SetUserInfo,
            user: user,
        }
    },
    
    setCurrentLinkman: function (user) {
        return {
            type: this.types.SetCurrentLinkman,
            user: user,
        }
    },
    
    setLoginStatus: function (status) {
        return {
            type: this.types.SetLoginStatus,
            status: status,
        }
    },
    
    addGroupMessage: function (group, message) {
        return {
            type: this.types.AddGroupMessage,
            group: group,
            message: message,
        }
    }
}