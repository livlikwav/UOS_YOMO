const passport = require('passport');
const database=require('../model/database');
const google=require('./googleStrategy');

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
      done(null, user[0].id);
  });

  passport.deserializeUser(function(id, done) {
      database['UserModel'].findOne(id,function(err,user){
        console.log("뭕데이거"+user);
        console.log("뭕데이거"+err);
        console.log("뭕데이거"+id);
        if(err)
          done(err)
        else
          done(null, id);
      });
  });
  google(passport);
}
