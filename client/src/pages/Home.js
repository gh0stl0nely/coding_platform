import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from "../components/QuestionTable";


function Home() {
    const [difficulty, setDifficulty] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [questions, setQuestions] = useState([]);

    // Upon rendering, each question will have its own _id, so whenever the use clicks on any question, 
    // They will be led to /question/:id, once they are on /question/:id, useEffect on that page will fire
    // And then we will query the database to find that particular question, send back to frontend (see the data model in QuestionDisplayPage),
    // and then we can use that data to setState. 
    useEffect(() => {
        // *** YOU DONT NEED TO IMPLEMENT THIS YET, just make sure rendering with sampleData is working first *** 

        // This useEffect will be fired whnever user goes to "/"  

        // Basically it will query the backend, get all the questions and send it back here
        // we will then call setQuestions(questionsFromBackEnd)

        return "Data from backend here";
        
    }, [])

    // Use the data is received from the useEffect, we will do the rendering as follow:
    // You can use difficulty to translate to number of star (i.e: Easy == 1 star)
    // You can use title as title of question 
    // You can use type to filter and group questions (type = question type)
    // You can use isSolved to whether to have a "Tick" on that question or not
    // Ignore the rest of the field for now. 
    const sampleData = [{
        _id: "123saddsahd1",
        title: "Array Q1",
        description: "This is Description",
        difficulty: "Hard",
        type: "Array",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: true, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    },{
        _id: "123saddsahd",
        title: "Array Q2",
        description: "This is Description",
        difficulty: "Easy",
        type: "Array",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: false, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    },
    {
        _id: "123saddsahd",
        title: "String Q1",
        description: "This is Description",
        difficulty: "Medium",
        type: "String",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: true, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    },{
        _id: "123saddsahd",
        title: "String Q2",
        description: "This is Description",
        difficulty: "Easy",
        type: "Array",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: false, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    },{
        _id: "123saddsahd",
        title: "Hash Table Q1",
        description: "This is Description",
        difficulty: "Hard",
        type: "Hash Table",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: true, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    },{
        _id: "123saddsahd",
        title: "Hash Table Q2",
        description: "This is Description",
        difficulty: "Medium",
        type: "Hash Table",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: false, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    }]

    const handleChange = (event) => {
        setDifficulty(event.target.value);
        setQuestionType(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <Grid container justify="center">
                <Grid item style={{ background: "red", height: "300px" }} xs={12}>
                    <h1>App name</h1>
                    <p>Introduction paragaraph</p>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                    <FormControl style={{ minWidth: 180, marginLeft: "30px" }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Difficulty</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={difficulty}
                            onChange={handleChange}
                            autoWidth
                        >
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Hard"}>Hard</MenuItem>
                        </Select>
                        <FormHelperText>Choose question difficulty</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                    <FormControl style={{ minWidth: 180, marginLeft: "30px" }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Question Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={questionType}
                            onChange={handleChange}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Choose question type</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary">
                        Reset Filter
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Table />
                    {/* This is where the rendering will happen */}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;