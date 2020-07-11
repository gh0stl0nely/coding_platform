const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    lastQuestionTitle: String,
    questions: [{
        questionType: String,
        difficulty: String,
        title: String,
        cacheInput: String,
        isSolved: Boolean,
    }]
}); 

const User = mongoose.model("User", UserSchema);

module.exports = User;

