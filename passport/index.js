const passport = require('passport');
const database=require('../model/database');
const google=require('./googleStrategy');

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      database['UserModel'].findOne(user.id,function(err,result){
        if(err)
          done(err)
        else
          done(null, user);
      });
  });
  google(passport);
}
