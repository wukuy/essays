const express = require('express');
const User = require('../models/user');
const Directory = require('../models/directory');
const Content = require('../models/content');
const mongoose = require('mongoose');

let router = express.Router();
let responeseData;

let getUser = async (params) => {
	try {
		return	await User.findOne(params);
	} catch (error) {}
};

let verifyApi = async (url) => {
	let verifyApi = [
		'/get/directory/'
	];
	if (verifyApi.includes(url)) {
		return	await getUser({_id: userId});
    } else {
        return true;
	}
}

let setResponeseData = (data) => {
    Object.assign(responeseData, {
        code: data.code === undefined ? 0 : data.code,
        data: data.data === undefined ? '' : data.data,
        msg: data.msg === undefined ? '' : data.msg
    });
}

// 当请求/home路径 responeseData 对象内容重置
router.use(async function (req, res, next) {
    responeseData = {
        code: 0,
        data: '',
        msg: ''
    };

    let result = await verifyApi(req.url);
    if (!result) {
        setResponeseData({code: 10010, msg: '会话已失效!'});
        res.send(responeseData);
    } else {
        next();
    }
});

// 获取目录下的所有文章
router.get('/get/content', async function (req, res) {
    let body = req.query;
    let userName = body.userName;
    let user = await getUser({userName});
    if (!user) {
        setResponeseData({ code: 10011, msg: '用户不存在' });
        res.json(responeseData);
        return;
    }

    Content.find({userId: user._id}).populate('userId').exec(function (err, data) {
        if (!err) {
			let arr = [];
			data.forEach(item => {
				item.userName = item.userId.userName;
				let tmp = {
					collectCount: item.collectCount,
					commentCount: item.commentCount,
					content: item.content,
					directoryId: item.directoryId,
					htmlContent: item.htmlContent,
					title: item.title,
					updateDate: item.updateDate,
					createDate: item.createDate,
					viewCount: item.viewCount,
					userName: item.userName,
					id: item._id
				};

				if (body.directoryId === '0') {
					arr.push(tmp);
				} else if (item.directoryId.toString() === body.directoryId) {
					arr.push(tmp);
				}
			});
            setResponeseData({ data: arr });
        };
        res.json(responeseData);
    });
});

// 获取文章具体内容
router.get('/get/article', function (req, res) {
    let body = req.query;
    let _id = body._id;
    if (_id === undefined) {
        setResponeseData({ msg: '文章id不能为空', code: 10002 });
        res.send(responeseData);
    } else {
        Content.findOne({ _id }, function (err, data) {
            if (!err) {
                setResponeseData({ data });
                res.send(responeseData);
            } else {
                setResponeseData({ msg: '查询失败', code: 10003 });
                res.send(responeseData);
            }
        });
    }
});


// 获取目录
router.get('/get/directory', async function (req, res) {
    let body = req.query;
    let userName = body.userName;
    let user = await getUser({userName});
    if (!user) {
        setResponeseData({ code: 10011, msg: '用户不存在' });
        res.json(responeseData);
        return;
    }

    Directory.find({userId: user._id}, function (err, data) {
        if (!err) {
            data.unshift({_id: '0',name: '全部'});
            setResponeseData({ data });
        }
        res.json(responeseData);
    });
});

// 更换头像

module.exports = router;
