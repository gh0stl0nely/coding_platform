const fs = require("fs");
const util = require('util');
// const writeFileAsync = util.promisify(fs.writeFile);
// const path = require("path");
const { NodeVM } = require("vm2");
const assert = require("chai").assert;
const Question = require("../model/Question");

module.exports = {
    processUserInput: async function(req,res,next){
        const { question, userID} = req.body;
        // So right now we pass the question down is not necessary because we can just access it from question.js...
        const inputs = question.answers.inputs;
        const outputs = question.answers.expectedOutputs;
        const userCode = question.cacheInput; // Pass this template literal into VM to run
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
        const { question } = req.body;
        // So right now we pass the question down is not necessary because we can just access it from question.js...
        const sampleInput = question.inputOne;
        const sampleOutput = question.outputOne;
        const userCode = question.cacheInput; // Pass this template literal into VM to run
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
        const { question } = req.body;
        const questionID = question["_id"];

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

            await Question.findByIdAndUpdate(questionID, {isSolved: true});
        };

        next();
    },

    saveUserInput: async function(req,res,next){
        const { question } = req.body;
        // Later on, when we want to only store user in question.js ?
        // The thing is that question.js can only store 
        // If we want, we can create a question.py and open the RIGHT file to search for question
        // And compare, since that way, we DONT EVEN NEED TO STORE QUESTION IN A DATABASE

        // But that is for later :)
        const questionID = question["_id"];
        const cacheInput = question.cacheInput;
        try  {
            await Question.findByIdAndUpdate(questionID, {cacheInput});
            next();
        } catch(e){
            // Maybe we should handle error here if it fails?
            throw e;
        };
    },

}