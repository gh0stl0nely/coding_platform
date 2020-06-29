import React from 'react';
import Grid from '@material-ui/core/Grid';
import QuestionCard from "../components/QuestionCard";

export default {
    renderQuestionsWithDifficultyOptionOnly : function(data, difficulty){
        const allQuestionTypes = ["Array", "String", "Hash Table"];
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
        const allQuestionTypes = ["Array", "String", "Hash Table"];
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
}