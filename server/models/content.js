const mongoose = require('mongoose');
let contentSchema = require('../schemas/content');

module.exports = mongoose.model('Content', contentSchema);