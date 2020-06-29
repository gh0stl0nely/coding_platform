import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
// import QuestionCard from "../components/QuestionCard";
import StarIcon from "@material-ui/icons/Star";
import Helper from "../utils/helper";
import { UserContext } from "../context/UserAuthentication";
import LastQuestionButton from "../components/LastQuestionButton";

const styles = {
    iconStyle: {
        position: "relative",
        bottom: "10px"
    }
}

var sampleData = [{
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

function Home() {

    // If isLoggedin is true, then show question, if not blury them?
    const { loginStatus } = useContext(UserContext);
    const [difficulty, setDifficulty] = useState('');
    const [questionType, setQuestionType] = useState('');

    // If they are logged in, we know that loginStatus.questions is NOT null.
    const questionsToRender = loginStatus.questions.length > 0 ? loginStatus.questions : sampleData;

    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value);
    };

    const handleChangeQuestionType = (event) => {
        setQuestionType(event.target.value);
    }

    const resetFilter = () => {
        setDifficulty("");
        setQuestionType("");
    }

    // Once done, we can substitute sampleData with questions
    const renderQuestions = () => {
        let result;

        if(difficulty != '' && questionType != ''){
            result = Helper.renderQuestionWithBothOptions(questionsToRender, difficulty, questionType);
        } else if(difficulty == '' && questionType != ''){
            result = Helper.renderQuestionsWithQuestionTypeOnly(questionsToRender, questionType);
        } else if(difficulty != '' && questionType == ''){
            result = Helper.renderQuestionsWithDifficultyOptionOnly(questionsToRender, difficulty);
        } else {
            // Render all questions because no filters were chosen
            result = Helper.renderQuestionsWithoutFilter(questionsToRender);
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
            <Grid style={{marginTop: "20px", paddingTop: "20px"}} container justify="center">
                <LastQuestionButton />
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
                    <Button variant="contained" color="primary" onClick={resetFilter}>
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