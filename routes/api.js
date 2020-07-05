const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Question = require("../model/Question");
const { questionList } = require("../question");
const passport = require("../auth/passport");
const jwt = require('jsonwebtoken');
const { saveUserInput , processUserInput, processLogging, checkIsQuestionSolved } = require("./middleware");

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


// Route for saving cacheInput automatically
// router.post("/question/save", async (req, res) => {
//     const {
//         _id,
//         cacheInput
//     } = req.body;
//     return await Question.findByIdAndUpdate(_id, {
//         cacheInput
//     });
//     // No need to sendback the updatedQuestion because frontend was already updated!
// });

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
        console.log("Found duplicate");
        return res.json({
            msg: "User existed"
        });
    }

    // Honestly no need to do any of this ... Because we just need to store the user data 
    const createQuestions = async () => {
        return Promise.all(questionList.map(async (item) => {
            const question = await Question.create(item);
            return question;
        }));
    }

    const questionData = await createQuestions();

    const user = await User.create({
        username: username,
        email: email,
        password: password,
        lastQuestionID: "",
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

router.get("/auth", passport.authenticate('jwt', {
    session: false,
    failureRedirect: "/api/notAuth"
}), (req, res) => {
    return res.json({
        uid: req.user["_id"],
        isAuthenticated: true,
        username: req.user.username,
        questions: req.user.questions,
        lastQuestionID: req.user.lastQuestionID
    });
});

// Redirected to this route if user is not authenticated
router.get("/notAuth", (req, res) => {
    return res.json({
        isAuthenticated: false,
    });
});

// Find the correct question by ID to display
router.post("/question", async (req, res) => {
    // id represents the ID of the user last clicked on
    const {
        userID,
        questionID
    } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userID, {
            lastQuestionID: questionID
        }).populate('questions').exec();

        const selectedQuestion = user.questions.filter(question => question["_id"] == questionID)[0];

        return res.json({
            success: true,
            question: selectedQuestion
        });
    } catch (e) {
        return res.json({
            success: false,
            msg: "User with the specified name not found"
        });
    }

});

module.exports = router;