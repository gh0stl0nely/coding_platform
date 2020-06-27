const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Question = require("../model/Question");
const {questionList} = require("../question");
const passport = require('passport');

router.post("/code", (req,res) => {
    const userInputs = req.body;
    console.log(userInputs);
});

// Test 
// A sample route for creating a new user, adding all questions for that user
router.get("/newUser", async (req,res) => {
    const createQuestions = async () => {
        return Promise.all(questionList.map(async (item) => {
            const question = await Question.create(item);
            return question;
        }))
    }

    const questionData = await createQuestions();
    const user = await User.create({
        name: "Khoi",
        password: "2",
        lastQuestionID: "",
        questions: questionData
    });

    console.log(user);

})

// Log in and authenticate route
router.post("/login", passport.authenticate("local"), (req,res) => {
    
})

// This is sample route for getting user by ID and populate the list of questions :) 
// This is probably where the comparison happens !!! 

// This should a post (Because this is when they submit!)
// post("/submit")

router.get("/submit", async (req,res) => {
    // Find the user and populate questions
    // const userId = req. <= From passport.js
    // const userFunction = req.body.fn; <= Get from id="editor?" as A STRING
    // const questionId = req.body.qid; <= Maybe from the button click? 

    const user = await User.findById("5ef3f8330b84527e5e1e8d93").populate("questions").exec();

    // Get the questions, find the question they are working on by looking for the question ID (by filtering)
    
    const questionLists = user.questions;
    const chosenQuestion = questionLists.filter(question => question["_id"] == "5ef3f8330b84527e5e1e8d92");

    console.log(chosenQuestion[0].answers); // { inputs: [ 1, 2, 3 ], expectedOutputs: [ 4, 5, 6 ] }
})


module.exports = router;