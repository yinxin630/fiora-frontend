# fiora-frontend

Fiora聊天室前端

本仓库已停止更新, 请移步 `https://github.com/yinxin630/fiora`

## 技术栈

* 语言: JavaScript ES6, HTML5, CSS3
* 框架: Koa, React, Redux, React-Router
* 工具:   
    1. webpack
    2. babel
    3. antd
    4. html5-desktop-notifications
    5. koa-send
    6. koa-static
    7. moment
    8. sails.io.js
    
## 安装

本项目依赖[node.js](http://npm.taobao.org/mirrors/node) v5.4 以上环境, 请下载与您的系统相对应的版本安装.  

1. 克隆项目 `git clone https://github.com/yinxin630/fiora-frontend`
2. 进入项目目录 `cd fiora-frontend`
3. 安装依赖库 `npm install`
4. 修改配置, 编辑`config.js`, 设置端口`port`, 设置后端地址`server`
5. 使用webpack打包文件, 执行`npm run build-dev` or `npm run build-prod` 
6. 运行静态资源服务器 `npm run dev` or `npm run prod`
