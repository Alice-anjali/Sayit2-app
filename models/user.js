var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email : String,
  name : String,
  username : String,
  password : String,
  review : {
    name : String,
    date : Date
  }
},{ collection: 'User' });

var appUser = mongoose.model('User', userSchema)

module.exports = appUser
