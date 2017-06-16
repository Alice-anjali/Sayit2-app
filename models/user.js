var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  admin : String,
  password : String
},{ collection: 'User' });

var appUser = mongoose.model('User', userSchema)

module.exports = appUser
