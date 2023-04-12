const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user._id);
    }
  });


passport.deserializeUser(async function(id, done){
try {
  const user = await User.findById({_id:id});
  
  delete user._doc.password;

  return done(null, user);
  
} catch (error) {
  
  return done(error);
}
});


  passport.use('local',
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, {
            type: "error",
            message: "Incorect email adress ot password",
          });
        }
    const valid = await bcryptjs.compare(password, user.password);
        
        if (!valid) {
          return done(null, false, {
            type: "error",
            message: "incorrect password",
          });
        }

        return done(null, user,
           {
          type:"success",
          message: "User Login Successfully"
        });
      }
    )
  );
};
