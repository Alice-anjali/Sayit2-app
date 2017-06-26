var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');

router.post('/signup', function(req, res, next) {
  User.findOne({email : req.body.email}, function(err,user_email){
    if (err){
      return handleError(err);
  }
  else{
    if (user_email){
    res.redirect('/?error=101');
    }
    else{
        User.findOne({username : req.body.username}, function(err,user_name){
          if (err){
             return handleError(err);
          }
          else{
            if (user_name){
            res.redirect('/?error=102');
            }
            else {
              if(req.body.password1 == req.body.password2){
                console.log("Creating a new user");
                var newUser = new User({
                  email : req.body.email,
                  name : req.body.name,
                  username : req.body.username,
                  password : req.body.password1,
                  review : {msg : "Just checking at 0"}
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
                  res.redirect('/?error=103');
              }
            }
          }
        });
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
        req.session.user_session = 'Baadshahmercy';
        req.session.dashboard = {
            usedata : user_data.email
        };
        res.redirect('/dashboard');
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
