const Koa = require('koa');
const app = new Koa();
const router = require('./routes/index')
const cors = require('koa2-cors');
app.use(cors());

app.use(router.routes(), router.allowedMethods())

app.listen(4000, () => {
    console.log('server is listening on port 4000')
})
