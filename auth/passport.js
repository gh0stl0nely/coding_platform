const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
// WE ARE GOING TO USE TOKEN FROM NOW ON !!! JWT WATCH THE VID PLS
// BASICALLY ONCE WE USE TOKENIZATION, ALL WE NEED NOW IS TO SEND BACK A TOKEN :) 
// BASICALLY .then to axios in signin page, then set localstorage to the value of

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secret';

// Configure passport to use local strategy and verify user using the callback function
// lets create our strategy for web token

let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, done) { 
    let user = await User.findOne({_id: jwt_payload["_id"]}).populate("questions").exec(); 
    if(!user){
        done(null,false, {msg: "User not found!", isAuthenticated: false});
    } else {
        done(null, user);
    }

});

passport.use(strategy);

module.exports = passport;

