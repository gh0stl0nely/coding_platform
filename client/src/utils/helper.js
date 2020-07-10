import React from 'react';
import Grid from '@material-ui/core/Grid';
import QuestionCard from "../components/QuestionCard";

export default {
    renderQuestionsWithDifficultyOptionOnly : function(data, difficulty){
        const allQuestionTypes = ["Array", "String", "Hash Table", "Recursion", "Divide and Conquer"];
        const result = [];

        for (var i = 0; i < allQuestionTypes.length; i++) {
            const questionType = allQuestionTypes[i];
            const filteredData = data.filter(item => (item.difficulty == difficulty && item.type == questionType));
            const grid = (
                <Grid item xs={12} sm={6} md={4}>
                    <QuestionCard questionType={questionType} data={filteredData} />
                </Grid>
            )
            result.push(grid);
        };

        return result;
    },

    renderQuestionsWithQuestionTypeOnly: function(data, type){
        const result = [];
        const filteredData = data.filter(item => item.type == type);
        const grid = (
            <Grid style={{textAlign: "center"}} item xs={12} sm={6} md={4}>
                <QuestionCard questionType={type} data={filteredData} />
            </Grid>
        )
        result.push(grid);
        return result;
    },

    renderQuestionWithBothOptions: function(data, difficulty, type){
        const result = [];
        const filteredData = data.filter(item => (item.type == type && item.difficulty == difficulty));
        const grid = (
            <Grid item xs={12} sm={6} md={4}>
                <QuestionCard questionType={type} data={filteredData} />
            </Grid>
        )
        result.push(grid);
        return result
    },

    // Render all question
    renderQuestionsWithoutFilter : function(data){
        const allQuestionTypes = ["Array", "String", "Hash Table", "Recursion", "Divide and Conquer"];
        const result = [];

        for (var i = 0; i < allQuestionTypes.length; i++) {
            const questionType = allQuestionTypes[i];
            const filteredData = data.filter(item => item.type == questionType);
            const grid = (
                <Grid item xs={12} sm={6} md={4}>
                    <QuestionCard questionType={questionType} data={filteredData} />
                </Grid>
            )
            result.push(grid);
        };

        return result;
        
    },

    // Render partial or no test passed scenario
    renderLoggingOutput(result){
        const { message } = result;            
        return message.success ? renderLoggingOutputSuccess(result) : renderLoggingOutputError(result);
    },
    
    renderTestResults: function(result){
        const testResults = result.data;
        const { isAllPassed, failedQuestions } = result;
        // This checks for undefined output because this function also runs when on mount.
        if(isAllPassed == undefined){
            return;
        };

        return isAllPassed ? renderAllTestsPassed(testResults) : renderSomeTestsPassed(testResults, failedQuestions);
    }
}

function renderAllTestsPassed(testResultArray){
        return (
            <>
                <p style={{ color: "green" }}>Woohoo! All {testResultArray.length} Tests Passed !</p>
                {testResultArray.map((test, index) => {
                    return (
                        <p style={{ color: "green" }}>Test {index + 1} passed</p>
                    )
                })}
            </> 
        )
};

function renderSomeTestsPassed(testResultArray, numberOfFailedQuestions){
    return (
        <>
            <p style={{ color: "red" }}>Argg! {numberOfFailedQuestions} out of {testResultArray.length} Tests Failed...</p>
            {testResultArray.map((test, index) => {
                return test.success ? (
                    <p style={{ color: "green" }}>Test {index + 1} passed</p>
                ) : (
                    <p style={{ color: "red" }}>Test {index + 1} failed</p>
                )
            })}
        </> 
    )
};


function renderLoggingOutputSuccess(result){
    const { loggingOutputs } = result;

    return (
       <>
           <p style={{color: "green"}}>Your code was tested for the first test case and passed.</p>
           <p style={{color: "white"}}> ------------ Here are the logged outputs ------------</p>
           {loggingOutputs.map(logOutput => {
               return (
                   <p style={{color: "white"}}>{JSON.stringify(logOutput)}</p>
               )
           })}
       </>
    )
};

function renderLoggingOutputError(result){
    const { loggingOutputs, message } = result;

    return (
        <>
            <p style={{color: "red"}}>Your code was tested for the first test case and failed.</p>
            <p style={{color: "white"}}>------------ Here are the logged outputs ------------</p>
            {loggingOutputs.map(logOutput => {
                return (
                    <p style={{color: "white"}}>{JSON.stringify(logOutput)}</p>
                )
            })}
            <p style={{color: "red"}}>------------ Error message ------------</p>
            <p style={{color: "red"}}>{JSON.stringify(message.error)}</p>
        </>
    )
};