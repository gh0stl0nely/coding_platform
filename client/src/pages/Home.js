import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import QuestionCard from "../components/QuestionCard";
import StarIcon from "@material-ui/icons/Star";

import {UserContext} from "../context/UserAuthentication";

const styles = {
    iconStyle: {
        position: "relative",
        bottom: "10px"
    }
}

function Home() {

    // If isLoggedin is true, then show question, if not blury them?
    const { isLoggedin } = useContext(UserContext);
    const [difficulty, setDifficulty] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [questions, setQuestions] = useState([]);

    // Authenticate Token first 
    // Authenticated: Return the user?
    // Not authenticated: Hide the question
    // The only two places we need to authenticate is home page... 

    // Upon rendering, each question will have its own _id, so whenever the use clicks on any question, 
    // They will be led to /question/:id, once they are on /question/:id, useEffect on that page will fire
    // And then we will query the database to find that particular question, send back to frontend (see the data model in QuestionDisplayPage),
    // and then we can use that data to setState. 


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
            inputs: [1, 2, 3],
            expectedOutputs: [1, 3, 4]
        }
    }, {
        _id: "123saddsahd",
        title: "Array Q2",
        description: "This is Description",
        difficulty: "Easy",
        type: "Array",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: false, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1, 2, 3],
            expectedOutputs: [1, 3, 4]
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
            inputs: [1, 2, 3],
            expectedOutputs: [1, 3, 4]
        }
    }, {
        _id: "123saddsahd",
        title: "String Q2",
        description: "This is Description",
        difficulty: "Easy",
        type: "String",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: false, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1, 2, 3],
            expectedOutputs: [1, 3, 4]
        }
    }, {
        _id: "123saddsahd",
        title: "Hash Table Q1",
        description: "This is Description",
        difficulty: "Hard",
        type: "Hash Table",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: true, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1, 2, 3],
            expectedOutputs: [1, 3, 4]
        }
    }, {
        _id: "123saddsahd",
        title: "Hash Table Q2 Hash Table Q2 Hash Table Q2Hash Table Q2",
        description: "This is Description",
        difficulty: "Medium",
        type: "Hash Table",
        cacheInput: "Cache Input", // This goes to the editor value 
        isSolved: false, // If it is solved, then status: Solved, and vice versa
        // No need to check for answers yet ! But included here for data integrity
        answers: {
            inputs: [1, 2, 3],
            expectedOutputs: [1, 3, 4]
        }
    }]

    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value);
    };

    const handleChangeQuestionType = (event) => {
        setQuestionType(event.target.value);
    }

    const renderQuestions = () => {
        const types = ["Array", "String", "Hash Table"];
        const result = [];

        for (var i = 0; i < types.length; i++) {
            const questionType = types[i];
            const filteredData = sampleData.filter(item => item.type == questionType);
            const grid = (
                <Grid item xs={12} sm={6} md={4}>
                    <QuestionCard questionType={questionType} data={filteredData} />
                </Grid>
            )
            result.push(grid);
        }
        return result;
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Grid container justify="center">
                <Grid item style={{ height: "300px", textAlign: "center", backgroundColor: "#80A7E3" }} xs={12}>
                    <h1>App name</h1>
                    <p>Introduction paragaraph</p>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    <FormControl style={{ minWidth: 180, marginLeft: "30px" }}>
                        <InputLabel id="difficultyLabel">Difficulty</InputLabel>
                        <Select
                            labelId="difficultyLabel"
                            id="difficulty"
                            value={difficulty}
                            onChange={handleChangeDifficulty}
                            autoWidth
                        >
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Hard"}>Hard</MenuItem>
                        </Select>
                        <FormHelperText>Choose desired difficulty</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    <FormControl style={{ minWidth: 180, marginLeft: "30px" }}>
                        <InputLabel id="questionTypeLabel">Question Type</InputLabel>
                        <Select
                            labelId="questionTypeLabel"
                            id="questionType"
                            value={questionType}
                            onChange={handleChangeQuestionType}
                            autoWidth
                        >
                            <MenuItem value={"Array"}>Array</MenuItem>
                            <MenuItem value={"String"}>String</MenuItem>
                            <MenuItem value={"Hash Table"}>Hash Table</MenuItem>
                        </Select>
                        <FormHelperText>Choose desired type</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", marginBottom: "10px" }}>
                    <Button variant="contained" color="primary">
                        Reset Filter
                    </Button>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#305c8a", color: "white" }}>
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>Easy </p><StarIcon style={styles.iconStyle} />
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#305c8a", color: "white" }}>
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>Medium </p><StarIcon style={styles.iconStyle} /><StarIcon style={styles.iconStyle} />
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#305c8a", color: "white" }}>
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>Hard </p><StarIcon style={styles.iconStyle} /><StarIcon style={styles.iconStyle} /><StarIcon style={styles.iconStyle} />
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
                {renderQuestions()}
            </Grid>
        </Container>
    )
}

export default Home;