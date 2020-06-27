const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const api_routes = require("./routes/api");
const session = require("express-session");
const passport = require("./auth/passport");


app.use(express.urlencoded({"extended": true}));
app.use(express.json());

// Configure session since Express does not create it automatically for us
const option = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}
//  if NODE_ENV is production then option.cookie.secure == true and set true

// Application -> Cookies -> connect.sid => This is the cookie that has the ID
// Tell DEMI to i again to get session!! 
app.use(session(option));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost/platform", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Route Config
app.use("/api", api_routes);

// Listening
app.listen(PORT, (req,res) => {
    console.log(`Listening to PORT ${PORT}`);
})