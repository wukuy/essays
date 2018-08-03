const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    parentId: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url'
	},
	createDate: String
});
