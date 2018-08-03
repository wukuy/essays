const Moment = require('moment');
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    directoryId: { // 关联目录表
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Directory'
    },
    userId: { // 关联用户表
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String, // 文章标题
	content: String, // 文章内容
	htmlContent: String, // html内容
	createDate: {
		type: String,
		default: Moment().format('YYYY-MM-DD HH:mm:ss')
	}, // 创建时间
	updateDate: String, // 修改时间
    viewCount: {
        type: Number,
        default: 0
    }, // 查看次数
    commentCount: {
        type: Number,
        default: 0
    }, // 评论次数
    collectCount: {
        type: Number,
        default: 0
    }, // 收藏次数
    public: { // 文章是否公开
        default: false,
        type: Boolean
	}
});
