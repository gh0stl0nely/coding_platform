import React, { useState, useContext }  from 'react';
import Helper from "../utils/helper";
import LastQuestionButton from "../components/LastQuestionButton";
import { questionList } from "../utils/question";
import StarIcon from "@material-ui/icons/Star";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { UserContext } from "../context/UserAuthentication";

const styles = {
    iconStyle: {
        position: "relative",
        bottom: "10px"
    }
}

export default function QuestionListPage() {
    const { loginStatus } = useContext(UserContext);
    const [difficulty, setDifficulty] = useState('');
    const [questionType, setQuestionType] = useState('');

    const questionsToRender = loginStatus.isLoggedin ? loginStatus.questions : questionList;
    console.log(questionsToRender);

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

    const renderQuestions = () => {
        let result;

        if (difficulty != '' && questionType != '') {
            result = Helper.renderQuestionWithBothOptions(questionsToRender, difficulty, questionType);
        } else if (difficulty == '' && questionType != '') {
            result = Helper.renderQuestionsWithQuestionTypeOnly(questionsToRender, questionType);
        } else if (difficulty != '' && questionType == '') {
            result = Helper.renderQuestionsWithDifficultyOptionOnly(questionsToRender, difficulty);
        } else {
            // Render all questions because no filters were chosen
            result = Helper.renderQuestionsWithoutFilter(questionsToRender);
        }

        return result;
    }
    return (
        <Container style={{ marginTop: "80px" }}>
            <Grid style={{ marginTop: "20px", paddingTop: "20px" }} container justify="center">
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
                        <FormHelperText>Choose difficulty</FormHelperText>
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
                            <MenuItem value={"Recursion"}>Recursion</MenuItem>
                            <MenuItem value={"Divide and Conquer"}>Divide and Conquer</MenuItem>
                        </Select>
                        <FormHelperText>Choose question type</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", marginBottom: "10px", marginTop: "20px" }}>
                    <Button variant="contained" color="primary" onClick={resetFilter}>
                        Reset Filter
                    </Button>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#305c8a", color: "white", borderRadius: "15px 0px 0px 15px" }}>
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>Easy </p><StarIcon style={styles.iconStyle} />
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#305c8a", color: "white" }}>
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>Medium </p><StarIcon style={styles.iconStyle} /><StarIcon style={styles.iconStyle} />
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#305c8a", color: "white", borderRadius: "0px 15px 15px 0px" }}>
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>Hard </p><StarIcon style={styles.iconStyle} /><StarIcon style={styles.iconStyle} /><StarIcon style={styles.iconStyle} />
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
                {renderQuestions()}
            </Grid>
        </Container>
    );
}