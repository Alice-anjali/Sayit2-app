var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');

var loggedincheck = function(req,res,next){
  if(req.session){
    if(req.session.user_session == 'Baadshahmercy'){
      return next();
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});

router.get('/dashboard', loggedincheck, function(req,res,next){
  if (req.session.dashboard) {
    User.findOne({email : req.session.dashboard.usedata},function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('dashboard',{userdata : result});
      }
    });
  }
  else {
    console.log("Not working");
  }
});

module.exports = router;
