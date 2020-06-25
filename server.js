const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const api_routes = require("./routes/api");


app.use(express.urlencoded({"extended": true}));
app.use(express.json());

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