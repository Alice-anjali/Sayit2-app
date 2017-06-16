var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email : String,
  name : String,
  username : String,
  password : String
},{ collection: 'User' });

var appUser = mongoose.model('User', userSchema)

module.exports = appUser
