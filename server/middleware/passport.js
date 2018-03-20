//const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local',new LocalStrategy(
    function(username, password, done) {
          User.getUserByUserName(username,function(err,user){
            if(err) throw err;
            if(!user){
              return done(null,false,{message:"unknow user"});
            }
            User.comparePassword(password,user.password,function(err,match){
              if(err) throw err;
              if(match) {
                return done(null,user)
              }else{
                return done(null,false,{message:"invalid password"});
              }
            })

          });
    }));

}




