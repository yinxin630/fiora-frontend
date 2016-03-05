'use strict'

const Static = require('koa-static');
const Send = require('koa-send');
const Koa = require('koa');
const app = Koa();

// 静态资源处理
app.use(Static('src/', {
        maxage: 1000 * 60 * 60 * 24,
        gzip: true,
    }
));

// 路由处理，request path中不包含.则视为路由请求
app.use(function *(){
    console.log('get request', this.path);
    
    if (this.path.match(/\./) === null) {
        yield Send(this, 'src/index.html', {
                maxage: 1000 * 60 * 60 * 24,
                gzip: true,
            }
        );
    }
});

app.listen(3000);
console.log('listening on port 3000');