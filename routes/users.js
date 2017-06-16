var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', function(req, res, next) {
  User.findOne({email : req.body.email}, function(err,user){
  if (err){
     return handleError(err);
  }
  else{
    if (user){
    console.log("User already present!");
    console.log("user = "+ user);
    }
    else{
      if(req.body.password1 == req.body.password2){
        console.log("Creating a new user");
        var newUser = new User({
          email : req.body.email,
          name : req.body.name,
          username : req.body.username,
          password : req.body.password1
        });
        newUser.save(function(err){
          if (err){
            return handleError(err);
          }
          else{
            console.log("New User created");
          }
        });
      }
      else{
        console.log("password doesnt match");
      }
    }
  }
});

});

module.exports = router;
