var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');

router.post('/signup', function(req, res, next) {
  User.findOne({email : req.body.email}, function(err,user){
  if (err){
     return handleError(err);
  }
  else{
    if (user){
    console.log("User already present!");
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
            res.redirect('/');
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

router.post('/login',function(req,res,next){
  User.findOne({username : req.body.login_username, password : req.body.login_password},function(err,user_data){
    if(err){
      res.redirect('/logout');
    }
    else{
      if(user_data){
        req.session.user_session = 'Baadshahmercy'
        res.render('dashboard',{userdata : user_data});
      }
      else{
        res.redirect('/');
      }
    }
  });
});

router.get('/logout', function(req,res,next){
  req.session.user_session = null;
  res.redirect('/');
});

module.exports = router;
