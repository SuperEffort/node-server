const router = require('koa-router')();
const senselessRefresh = require('./senselessRefresh') // 长登录
const largeFileUpload = require('./largeFileUpload') // 大文件上传

router.use(senselessRefresh.routes(), senselessRefresh.allowedMethods())
router.use(largeFileUpload.routes(), largeFileUpload.allowedMethods())

module.exports = router
