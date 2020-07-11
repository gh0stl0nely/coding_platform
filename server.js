const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const api_routes = require("./routes/api");
const cors = require('cors');
const passport = require("./auth/passport");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({"extended": true}));
app.use(express.json());
app.use(passport.initialize());
// const uri = process.env.MONGO_URI;

const DB_PATH = "mongodb+srv://gh0stl0nely:0903986011Aa>@cluster0.nbjjt.mongodb.net/coding_platform>?retryWrites=true&w=majority";

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Route Config
app.use("/api", api_routes);

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