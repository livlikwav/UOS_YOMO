const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

const database = require('../model/database');

module.exports = (passport) => {

  console.log("====여긴햇는데===");
  passport.use(new GoogleStrategy({
    clientID: '657195964430-avhckkk3dkveir10m3oi15rj7gj4qsj3.apps.googleusercontent.com',
    clientSecret: 'i8OqvLd31_Yy8nnR6R0ZvYXl',
    callbackURL: '/login/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("====토큰이받아와지네===");
      console.log("profile===============");
      console.log(profile);
      const exUser = await database['UserModel'].findOne(profile.id);
      console.log(exUser);
      if(typeof exUser == "object" && !Object.keys(exUser).length) {
        console.log("exUser False");
        const newUser = await database['UserModel'].create({
          id:profile.id,
          name: profile.displayName,
          rank: 2
        });
        done(null, newUser);
      } else {
        console.log("exUser True");
        done(null, exUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
