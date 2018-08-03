const mongoose = require('mongoose');
let directorySchema = require('../schemas/directory');

module.exports = mongoose.model('Directory', directorySchema);