const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: String,
    type: String,
    cacheInput: String,
    isSolved: Boolean,
    answers: {
        inputs: Array,
        expectedOutputs: Array
    }
});

// Question 
const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;