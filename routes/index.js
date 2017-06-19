var express = require('express');
var router = express.Router();
var path = require('path');

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
      var result = req.session.dashboard.usedata;
      res.render('dashboard',{userdata : result});
  }
  else {
    console.log("Not working");
  }
});

module.exports = router;
