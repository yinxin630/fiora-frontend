module.exports = {
    types: {
        SetToken: 'SetToken',
        SetUser: 'SetUser',
        SetUserInfo: 'SetUserInfo',
        AddLinkman: 'AddLinkman',
        SetCurrentLinkman: 'SetCurrentLinkman',
        SetLoginStatus: 'SetLoginStatus',
        AddGroupMessage: 'AddGroupMessage',
        AddUserMessage: 'AddUserMessage',
        SetWindowVisible: 'SetWindowVisible',
        SetComments: 'SetComments',
        ToggleNotification: 'ToggleNotification',
    },
    
    setToken: function (token) {
        return {
            type: this.types.SetToken,
            token: token
        };
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
    
    setCurrentLinkman: function (user, isGroup) {
        return {
            type: this.types.SetCurrentLinkman,
            user: user,
            isGroup: isGroup
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
    
    addUserMessage: function (user, message) {
        return {
            type: this.types.AddUserMessage,
            user: user, 
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
    },
    
    toggleNotification: function () {
        return {
            type: this.types.ToggleNotification
        };
    }
};