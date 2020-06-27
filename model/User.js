const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    lastQuestionID: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]
}); 

const User = mongoose.model("User", UserSchema);

module.exports = User;

