const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secret';

// Configure passport to use local strategy and verify user using the callback function
let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, done) { 
    let user = await User.findOne({_id: jwt_payload["_id"]});
    if(!user){
        done(null,false, {msg: "User not found!", isAuthenticated: false});
    } else {
        done(null, user);
    }

});

passport.use(strategy);

module.exports = passport;

