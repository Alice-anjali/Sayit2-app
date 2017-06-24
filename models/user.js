var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var reviewSchema = new Schema({
//    name : String,
//    date : Date,
//    msg : String
//  });

var userSchema = new Schema({
  email : String,
  name : String,
  username : String,
  password : String,
  review : [{name : String, date : Date, msg : String}]
},{ collection: 'User' });

var appUser = mongoose.model('User', userSchema)

module.exports = appUser
