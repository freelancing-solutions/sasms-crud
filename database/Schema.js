let mongoose = require('mongoose');

exports.User = mongoose.model('User', require('./UserSchema'));
exports.Accounts = mongoose.model('Accounts', require('./AccountsSchema'));