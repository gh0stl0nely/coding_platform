const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: String,
    type: String,
    cacheInput: String,
    isSolved: Boolean,
    beginningCode: String,
    inputOne: mongoose.Schema.Types.Mixed,
    inputTwo: mongoose.Schema.Types.Mixed,
    outputOne: mongoose.Schema.Types.Mixed,
    outputTwo: mongoose.Schema.Types.Mixed,
    answers: {
        inputs: Array,
        expectedOutputs: Array
    }
});

// Question 
const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;