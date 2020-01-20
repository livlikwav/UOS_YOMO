const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

const database = require('../model/database');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: '657195964430-avhckkk3dkveir10m3oi15rj7gj4qsj3.apps.googleusercontent.com',
    clientSecret: 'i8OqvLd31_Yy8nnR6R0ZvYXl',
    callbackURL: '/login/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await database['UserModel'].findOne(profile.id);
      if(typeof exUser == "object" && !Object.keys(exUser).length) {
        console.log("exUser False");
        const newUser = await database['UserModel'].create({
          id:profile.id,
          name: profile.displayName,
          rank: 2
        });
        var curUser={
          id:newUser.id,
          rank: newUser.rank,
          accessToken:accessToken
        };
        done(null, curUser);
      } else {
        var curUser={
          id:exUser[0].id,
          rank:exUser[0].rank,
          accessToken:accessToken
        };
        console.log("exUser True");
        done(null, curUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
