const passport = require("passport");
const STRATEGY = require("passport-local").Strategy;
const User = require("../model/User");

// Configure passport to use local strategy and verify user using the callback function
passport.use(new STRATEGY({
    usernameField: "username"
}, verifyUser));

async function verifyUser(username,password,done){
    try{
        console.log(username);
    }catch(e){
        return e;
    }
};

// So after passport.authenticate is called, passport will serialize the user

// How to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false; 
  done(null, user);
});
  


module.exports = passport;

