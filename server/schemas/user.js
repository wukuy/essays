const mongoose = require('mongoose');

module.exports =  new mongoose.Schema({
    userName: String,
	password: String,
	createDate: String,
	// loginDates: Array,
	lastLoginDate: String, // 最后时间
	headPic: { // 头像
		type: String,
		default: 'http://localhost:8080/static/img/head_default.e691107.jpg'
	}
});
