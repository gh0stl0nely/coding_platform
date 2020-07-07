const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const api_routes = require("./routes/api");
const auth_routes = require("./routes/auth");
const cors = require('cors');
const passport = require("./auth/passport");
const path = require("path");

app.use(express.urlencoded({"extended": true}));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const DB_PATH = process.env.MONGODB_URI || "mongodb://localhost/platform";

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Route Config
app.use("/api", api_routes);
// app.use("/auth", auth_routes);

// In production configuration
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listening
app.listen(PORT, (req,res) => {
    console.log(`Listening to PORT ${PORT}`);
})