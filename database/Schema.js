
let config = require('config');
let mongoose = require('mongoose');


// try using mongodb atlas to add mongo
mongoose.connect(process.env.MONGODB_URI || config.get("MONGODB_URI"), {useNewUrlParser : true, useUnifiedTopology : true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once("open", () => console.log('Conntected to mongoose'));

exports.User = mongoose.model('User', require('./UserSchema'));
exports.Accounts = mongoose.model('Accounts', require('./AccountsSchema'));