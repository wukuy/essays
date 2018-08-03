const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let port = 4000;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,sign');
    let sign = req.headers['sign'];
    try {
        global.userId = mongoose.Types.ObjectId(sign);    
    } catch (error) {
        global.userId = '';
    }
    
    next();
});

app.use('/', require('./routers/index'));
app.use('/admin', require('./routers/admin'));

app.listen(port, () => {
    console.log(`端口${port} 启动成功`);
});

mongoose.connect('mongodb://localhost:20018/blog', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
    }
});
