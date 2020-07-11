const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { questionList } = require("../question");
const passport = require("../auth/passport");
const jwt = require('jsonwebtoken');
const { saveUserInput , processUserInput, processLogging, checkIsQuestionSolved } = require("./middleware");

// Find the correct question by ID to display
router.post("/question", async (req, res) => {
    const {
        userID,
        questionTitle
    } = req.body;

    try {
       
        const user = await User.findByIdAndUpdate(userID, {
            lastQuestionTitle: questionTitle
        });
        const selectedQuestion = user.questions.filter(question => question["title"] == questionTitle)[0].toJSON();
        const codeInfo = questionList.filter(question => {
            return question["title"] == questionTitle
        })[0];

        selectedQuestion["description"] = codeInfo["description"];
        selectedQuestion["beginningCode"] = codeInfo["beginningCode"];
        selectedQuestion["solutionCode"] = codeInfo["solutionCode"];
        selectedQuestion["inputOne"] = codeInfo["inputOne"];
        selectedQuestion["inputTwo"] = codeInfo["inputTwo"];
        selectedQuestion["outputOne"] = codeInfo["outputOne"];
        selectedQuestion["outputTwo"] = codeInfo["outputTwo"];

        return res.json({
            success: true,
            question: selectedQuestion
        });

    } catch (e) {
        console.log("WRONG");
        return res.json({
            success: false,
            msg: "User with the specified name not found"
        });
    }

});

// Code submission
router.post("/question/submit", saveUserInput, processUserInput, checkIsQuestionSolved, (req,res) => {
    const testResults = res.locals.messageToClient;
    return res.json(testResults);
});

// Code running / logging
router.post("/question/run", saveUserInput, processLogging, (req,res) => {
    const loggingOutputs = res.locals.logger;
    const message = res.locals.message;

    return res.json({
        event: "Run code",
        loggingOutputs,
        message
    });
});

// This route handles creation of a new user and handle duplication
router.post("/signup", async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    // CHeck if already exist with the email or username or not
    const duplicateUser = await User.findOne({
        $or: [{
            username
        }, {
            email
        }]
    });

    if (duplicateUser) {
        // Found a duplicate user
        return res.json({
            msg: "User existed"
        });
    }

    const questionData = questionList.map(question => {
        return {
            questionType: question.questionType,
            difficulty: question.difficulty,
            title: question.title,
            cacheInput: "",
            isSolved: false
        }
    });

    const user = await User.create({
        username: username,
        email: email,
        password: password,
        lastQuestionTitle: "",
        questions: questionData
    });

    // Issue JWT Token
    const token = jwt.sign(user.toJSON(), 'secret');    
    return res.json({
        msg: "Successfully create a new user",
        token: token,
    });

})

// Log in route
router.post("/login", async (req, res) => {

    try {
        const {
            username,
            password
        } = req.body;

        // Check user in database
        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.json({
                msg: "User not found",
            });
        }
        
        // If user exists and password matches, then we will issue a token
        if (password == user.password) {
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

    } catch (e) {
        throw e;
    }
});

// Route for authentication jwt token
router.get("/auth", passport.authenticate('jwt', {
    session: false,
    failureRedirect: "/api/notAuth"
}), (req, res) => {    

    return res.json({
        uid: req.user["_id"],
        isAuthenticated: true,
        username: req.user.username,
        questions: req.user.questions,
        lastQuestionTitle: req.user.lastQuestionTitle
    });
});

// Redirected to this route if user is not authenticated
router.get("/notAuth", (req, res) => {
    return res.json({
        isAuthenticated: false,
    });
});

module.exports = router;
