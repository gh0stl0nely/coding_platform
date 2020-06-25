const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Question = require("../model/Question");


router.post("/code", (req,res) => {
    const userInputs = req.body;
    console.log(userInputs);
});

// Test 
// A sample route for creating a en
router.get("/newUser", async (req,res) => {
    // 
    console.log("Creating");

    const Q1 = await Question.create({
        title: "One",
        description: "One",
        difficulty: "One",
        type: "One",
        cacheInput: "One",
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [4,5,6]
        }
    });

    const u1 = await User.create({
        name: "Khoi",
        password: "2",
        questions: [Q1]
    });

    console.log(u1.questions[0]);
//     // {
//   answers: { inputs: [ 1, 2, 3 ], expectedOutputs: [ 4, 5, 6 ] },
//   _id: 5ef3f9add08ae77f817206ac,
//   title: 'One',
//   description: 'One',
//   difficulty: 'One',
//   type: 'One',
//   cacheInput: 'One',
//   __v: 0
// }

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