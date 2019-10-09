
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let UserSchema = new Schema({
  _id: mongoose.Types.ObjectId,  
  api_key : {type: String,required:[true,'api_key is required']},  
  name: {type: String,required:[true, 'name field is required']},
  email: {type: String, required:[true, 'email field is required']}
});

module.exports = UserSchema;