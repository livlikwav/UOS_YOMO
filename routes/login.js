const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./checkLogin');
const router = express.Router();

router.get('/logout', isLoggedIn, (req, res) => {
  console.log(req.session);

  var url='/';
  console.log(req.session.referrer);
  if( req.session.referrer )
    url=req.session.referrer;
  req.logout();
  req.session.destroy();
  res.redirect(url);
});

router.get('/google', passport.authenticate('google',{scope:['profile']}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/event'}),
 (req, res) => {
   var url='/';
   console.log(req.session.referrer);
  if( req.session.referrer )
    url=req.session.referrer;
  res.redirect(url);
});

module.exports = router;
