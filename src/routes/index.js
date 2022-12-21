var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function(req, res, next) {

  

  res.render('index', { 
    userProfile: req.oidc.user,
    title: 'Server' 
  });


});

router.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile.ejs',{
    userProfile: req.oidc.user,
    title: 'Profile page'
  });
});

module.exports = router;
