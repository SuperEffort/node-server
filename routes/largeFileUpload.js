const router = require('koa-router')();
const fs = require('fs');
const fse = require("fs-extra");
const path = require("path");

// 文件保存路径
const uploadPath = path.resolve(__dirname, '../upload')


// 大文件上传-上传切片
router.post('/uploadBigFile', async (ctx, next) => {
    const { hash, fileName } = ctx.request.body;
    const chunk = ctx.request.files.file
    const chunkDir = path.resolve(uploadPath, fileName);

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
    }
    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    ctx.body = {
        code: 200,
        msg: '上传成功'
    };
})

//  写入文件流
const writeFileStream = (path, writeStream) => {
    new Promise(resolve => {
        const readStream = fse.createReadStream(path)
        readStream.on('end', () => {
            fse.unlinkSync(path);
            resolve();
        })
        readStream.pipe(writeStream);
    })
}

// 合成切片
router.post('/mergeFileChunk', async (ctx, next) => {
    const { fileName, size } = ctx.request.body;
    const chunkDir = path.resolve(uploadPath, fileName);
    const chunkPaths = await fse.readdir(chunkDir);
    const filePath = path.join(__dirname, `fileEnd/${fileName}`); //生成的文件名
    // 根据切片下标进行排序
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

    // await Promise.all(
    //     // chunkPaths.map((chunkPath, index) => {
    //     //     writeFileStream(
    //     //         path.resolve(chunkDir, chunkPath),
    //     //         fse.createWriteStream(chunkDir, {
    //     //             start: index * size,
    //     //             end: (index + 1) * size
    //     //         })
    //     //     )
    //     // })
    // )

    ctx.body = {
        code: 200,
        msg: '合成切片123123'
    };
})


module.exports = router;
