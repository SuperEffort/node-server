const Koa = require('koa');
const app = new Koa();
const router = require('./routes/index')
const cors = require('koa2-cors');
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制
    }
}));
app.use(cors());

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(4000, () => {
    console.log('server is listening on port 4000')
})
