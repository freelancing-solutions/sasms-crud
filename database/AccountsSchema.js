let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let AccountsSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  api_key: String,
  amount_rands: String
});

module.exports = AccountsSchema;