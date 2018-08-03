const express = require('express');
const User = require('../models/user');
const Directory = require('../models/directory');
const Content = require('../models/content');
const mongoose = require('mongoose');
const Moment = require('moment');
let router = express.Router();

// 获取用户
let getUser = async (params) => {
    try {
        return  await User.findOne(params);
    } catch (error) {}
}

// 获取当前时间 YYYY-MM-DD HH:mm:ss
let getCurrentDate = () => {
	return Moment().format('YYYY-MM-DD HH:mm:ss');
}

// 登陆验证
let verifyApi = async (url) => {
    let verifyApi = [
        '/get/directory/'
    ];
    if (verifyApi.includes(url)) {
        return await getUser({_id: userId});
    } else {
        return true;
    }
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

//
let setResponeseData = (data) => {
    Object.assign(responeseData, {
        code: data.code === undefined ? 0 : data.code,
        data: data.data === undefined ? '' : data.data,
        msg: data.msg === undefined ? '' : data.msg
    });
}

// 注册
router.post('/register', async function (req, res) {
    let data = req.body;
    let user = await getUser({userName: data.userName});
    if (data.userName === undefined || data.password === undefined) {
        setResponeseData({
            msg: '账号或密码不能为空!',
            code: 10000
        });
    } else if (user) {
        setResponeseData({ msg: `${data.userName}用户已存在!`, code: 10019 });
    } else {
        setResponeseData({ msg: '注册成功' });
        new User({
            userName: data.userName,
			password: data.password,
			createDate: getCurrentDate()
        }).save(function (err, data) {
            if (err) {
                console.log('数据库保存注册数据失败');
            } else {
                console.log(data);
            }
        });
    }
    res.json(responeseData);
});

// 登录
router.post('/login', async function (req, res) {
	let data = req.body;
	if (data._id) {
		try {
			let result = await getUser({_id: mongoose.Types.ObjectId(data._id)});
			if(!result) {
				setResponeseData({code: 10010, msg: '会话已失效'});
			} else {
				setResponeseData({ msg: '登录成功', data: {
					userName: 	result.userName,
					_id: result._id,
					headPic: result.headPic
				}});
			}
		} catch (error) {
			setResponeseData({code: 10010, msg: '会话已失效'});
		}
	} else if (data.userName === undefined || data.password === undefined) {
        setResponeseData({
            msg: '账号或密码不能为空!',
            code: 10000
        });
        res.json(responeseData);
    } else {
		let query = {
			userName: data.userName,
			password: data.password
		}

		let result = await User.findOne(query);

		if (result) {
			setResponeseData({ msg: '登录成功', data: {
				userName: 	result.userName,
				_id: result._id,
				headPic: result.headPic
			}});
		} else {
			setResponeseData({msg: '账号或密码错误',code: '10001'});
		}

		await User.updateOne(query, {lastLoginDate: getCurrentDate()});
	}
	res.send(responeseData);
});

// 获取目录
router.get('/get/directory', function (req, res) {
    console.log(userId);
    Directory.find({userId: userId},function (err, data) {
        if (!err) setResponeseData({ data });
        res.json(responeseData);
    });
});

// 获取目录下的所有文章
router.get('/get/content', async function (req, res) {
    let body = req.query;

    Content.find({userId}, function (err, data) {
        if (!err) {
			console.log(data);
            if (body.directoryId !== '0') {
                data = data.filter(item => {
                    return item.directoryId.toString() === body.directoryId;
				});
            }
            setResponeseData({ data });
        };
        res.json(responeseData);
    });
});

// 添加目录
router.post('/add/directory', function (req, res) {
    let body = req.body;
    // 提交的内容验证
    if (!body.name) {
        setResponeseData({
            code: 10002,
            msg: '目录不能空'
        });
        res.json(responeseData);
    } else {
        new Directory({
			createDate: getCurrentDate(),
            name: body.name,
            parentId: body.parentId === undefined ? 0 : body.parentId,
            userId
        }).save(function (err) {
            if (!err) {
                setResponeseData({ msg: '保存成功' });
            }
            res.json(responeseData);
        });
    }
});

// 删除目录(目录下有文章不可删除)
router.post('/del/directory', async function (req, res) {
	let body = req.body;

	let id = mongoose.Types.ObjectId(body._id);
    // 提交的内容验证
    if (!body._id) {
        setResponeseData({
            code: 10002,
            msg: '文集id不能为空'
        });
        res.json(responeseData);
    } else {
        let data = await Directory.remove({
			_id:  mongoose.Types.ObjectId(body._id)
		})
		let contents = await Content.find({directoryId: id});
		if (contents.length) {
			setResponeseData({ msg: '文集下存在文章', code: 2000 });
		} else if(data) {
			setResponeseData({ msg: '删除成功'});
		}

		res.json(responeseData);
    }
});

// 添加文章
router.post('/add/content', function (req, res) {
    let body = req.body;
    // 提交的内容验证
    if (body.title === '' || body.title === undefined) {
        setResponeseData({ msg: '标题不能为空', code: 10005 });
        res.json(responeseData);
    } else if (body.directoryId === '' || body.directoryId === undefined) {
        setResponeseData({ msg: '分类不能为空', code: 10006 });
        res.json(responeseData);
    } else {
        Directory.find({ _id: mongoose.Types.ObjectId(body.directoryId) }, function (err, data) {
            if (err) {
                responeseData({ msg: '分类错误', code: 10007 });
            } else {
                new Content({
                    title: body.title,
                    directoryId: mongoose.Types.ObjectId(body.directoryId),
                    content: body.content,
					userId,
					createDate: getCurrentDate()
                }).save(function (err, data) {
                    if (!err) {
                        console.log(data);
                        setResponeseData({ msg: '新增成功', data: {_id: data._id}});
                        res.json(responeseData);
                    }
                });
            }
        });
    }
});

// 修改文章
router.post('/update/content', function (req, res) {
    let body = req.body;
    // 提交的内容验证
    if (body.title === '' || body.title === undefined) {
        setResponeseData({ msg: '标题不能为空', code: 10005 });
        res.json(responeseData);
    } else if (body.directoryId === '' || body.directoryId === undefined) {
        setResponeseData({ msg: '分类不能为空', code: 10006 });
        res.json(responeseData);
    } else {
        Content.update({ _id: body._id }, {
			title: body.title,
			content: body.content,
			htmlContent: body.htmlContent,
			updateDate: getCurrentDate()
		}, function (err, data) {
            if (!err) {
                setResponeseData({ msg: '修改成功' });
            }
            res.json(responeseData);
            Content.findOne({ _id: body._id }, function (err, data) {
                if (!err) {
                    console.log(data);
                }
            });
        });
    }
});

// 公开文章
router.post('/update/content/public', function (req, res) {
    let body = req.body;
    // 提交的内容验证
    if (body.title === '' || body.title === undefined) {
        setResponeseData({ msg: '标题不能为空', code: 10005 });
        res.json(responeseData);
    } else if (body.directoryId === '' || body.directoryId === undefined) {
        setResponeseData({ msg: '分类不能为空', code: 10006 });
        res.json(responeseData);
    } else {
        Content.update({ _id: body._id }, { title: body.title, content: body.content }, function (err, data) {
            if (!err) {
                setResponeseData({ msg: '修改成功' });
            }
            res.json(responeseData);
            Content.findOne({ _id: body._id }, function (err, data) {
                if (!err) {
                    console.log(data);
                }
            });
        });
    }
});

// 删除文章
router.get('/del/content', function (req, res) {
    let body = req.query;
    let id = body.id;
    // 提交的内容验证
    if (id === '' || id === undefined) {
        setResponeseData({ msg: '分类不能为空', code: 10006 });
        res.json(responeseData);
    } else {
        Content.remove({ _id: id }, function (err, data) {
            if (!err) {
                setResponeseData({ msg: '删除成功' });
            }
            res.json(responeseData);
        });
    }
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


module.exports = router;
