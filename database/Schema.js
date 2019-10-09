let config = require('config');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.get("MONGODB_URI"), {useNewUrlParser : true, useUnifiedTopology : true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once("opne", () => console.log('Conntected to mongoose'));

exports.User = mongoose.model('User', require('./UserSchema'));
exports.Accounts = mongoose.model('Accounts', require('./AccountsSchema'));