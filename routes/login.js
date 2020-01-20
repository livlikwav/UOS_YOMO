const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./checkLogin');
const router = express.Router();

router.get('/logout', isLoggedIn, (req, res) => {
  console.log(req.session);
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google',{scope:['profile']}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/event'}),
 (req, res) => {
  res.redirect('/');
});

module.exports = router;
