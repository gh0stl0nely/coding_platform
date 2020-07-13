const { questionList } = require("../question");
const User = require("../model/User");
const { NodeVM } = require("vm2");
const assert = require("chai").assert;

module.exports = {
    processUserInput: async function(req,res,next){
        // Question also contains 

        const { userInput } = req.body;
        // So right now we pass the question down is not necessary because we can just access it from question.js...
        const selectedQuestion = questionList.filter(question => {
            return userInput.title == question.title
        })[0];

        const inputs = selectedQuestion.answers.inputs;
        const outputs = selectedQuestion.answers.expectedOutputs;
        const userCode = userInput.cacheInput; // Pass this template literal into VM to run

        const result = [];
        let failedQuestionCounter = 0;

        // Spin up a virtual environment
        const vm = new NodeVM({
            console: 'redirect',
            timeout: 2000,
        });

        for (var i = 0; i < inputs.length; i++) {
            // console.log(userFunction(inputToTest));
            try {
                const userFunction = vm.run(userCode);

                if(!Array.isArray(inputs[i]) && typeof inputs[i] === 'object'){
                    let params = Object.values(inputs[i]);
                    // We need to destructure the values of each param into the function
                    assert.deepEqual(userFunction(...params), outputs[i]);
                } else {
           
                    assert.deepEqual(userFunction(inputs[i]), outputs[i]);
                }

                result.push({
                    testNumber: i,
                    success: true
                });
            } catch (e) {
                result.push({
                    testNumber: i,
                    success: false,
                    error: e
                });
                failedQuestionCounter++;
            }
        };

        // Check result if all success is true then we will search for username and will change isSolved to solve
        res.locals.result = result;
        res.locals.failedQuestions = failedQuestionCounter;
        // Pass to checkIsQuestionSolved middle
        
        next();

    },

    // This captures all the console 
    processLogging: async function(req,res,next){
        const { userInput } = req.body;
        // So right now we pass the question down is not necessary because we can just access it from question.js...
        const selectedQuestion = questionList.filter(question => {
            return userInput.title == question.title
        })[0];

        const sampleInput = selectedQuestion.inputOne;
        const sampleOutput = selectedQuestion.outputOne;
        const userCode = userInput.cacheInput; // Pass this template literal into VM to run

        const message = {};
        const logger = []; 

        // Spin up a virtual environment
        const vm = new NodeVM({
            console: 'redirect',
            timeout: 2000,
        });

        vm.on('console.log', (loggedMessage) => {
            logger.push(loggedMessage);
        });

        try {
            const userFunction = vm.run(userCode);

            if(!Array.isArray(sampleInput) && typeof sampleInput === 'object'){
                let params = Object.values(sampleInput);
                // We need to destructure the values of each param into the function
                assert.deepEqual(userFunction(...params), sampleOutput);
            } else {
                assert.deepEqual(userFunction(sampleInput), sampleOutput);
            }

            message["success"] = true;
        } catch (e) {
            message["success"] = false;
            message["error"] = `${e}`;
        }

        res.locals.message = message;
        res.locals.logger = logger;

        next();

    },

    checkIsQuestionSolved: async function(req,res,next){
        const result = res.locals.result;
        const failedQuestionsCounter = res.locals.failedQuestions;
        const { userInput, userID } = req.body;
        const questionTitle = userInput["title"];

        // There are failed questions
        if(failedQuestionsCounter > 0){
            res.locals.messageToClient = {
                message: "Contained data and message after running tests",
                data: result,
                isAllPassed: false,
                failedQuestions: failedQuestionsCounter,
                event: "Submit code"
            };
        } else {
            // All test passed, check 
            res.locals.messageToClient = {
                message: "Contained data and message after running tests",
                data: result,
                isAllPassed: true,
                event: "Submit code"
            };

            // Find user by ID and update isSolved to true
            const user = await User.findById(userID);
            
            const updatedQuestion = user.questions.map(question => {
                if(question.title == questionTitle){
                    question.isSolved = true;
                    return question;
                } else {
                    return question;
                }
            });

            user.questions = updatedQuestion;
            await user.save();
        };

        next();
    },

    saveUserInput: async function(req,res,next){
        const { userInput, userID } = req.body;

        const user = await User.findById(userID);
        const updatedQuestion = user.questions.map(question => {
            if(question.title == userInput.title){
                question.cacheInput = userInput.cacheInput;
                return question;
            } else {
                return question;
            }
        });

        user.questions = updatedQuestion;
        user.save();

        next();
    },

}