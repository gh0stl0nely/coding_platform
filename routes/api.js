const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Question = require("../model/Question");
const {questionList} = require("../question");
const passport = require("../auth/passport");
const jwt = require('jsonwebtoken');

router.post("/code", (req,res) => {
    const userInputs = req.body;
    console.log(userInputs);
});

// This route handles creation of a new user
// BONUS: Maybe after all is done, make sure to check the database first to make sure there is no
// duplicate email and usernam :) But it is ok for now. Can write a seperate function for that
router.post("/signup", async (req,res) => {
    const { username, email, password } = req.body;
    const createQuestions = async () => {
        return Promise.all(questionList.map(async (item) => {
            const question = await Question.create(item);
            return question;
        }))
    }

    const questionData = await createQuestions();

    const user = await User.create({
        username: username,
        email: email,
        password: password,
        lastQuestionID: "",
        questions: questionData
    });
})

// Log in and authenticate route
router.post("/login", async (req,res) => {
    
    try {
        const { username, password } = req.body;
    
        // Check user in database
        const user = await User.findOne({username});
        
        if(!user){
            return res.json({
                msg: "User not found",
            });
        }

        if(password == user.password){
            const token = jwt.sign(user.toJSON(), 'secret');
            return res.json({
                success: true,
                token: token,
            }); 

        } else {
            // Wrong password
            return res.json({
                msg: "Incorrect credentials",
            });
        }
    } catch(e){
        throw e;
    }
   
})

router.get("/auth", passport.authenticate('jwt', {session: false}), (req,res) => {
    console.log("Authenticated!");
    res.json({
        isAuthenticated: true,
        username: req.user.username
    });

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