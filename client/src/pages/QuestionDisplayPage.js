import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CodeEditor from "../components/CodeEditor";
import StarIcon from "@material-ui/icons/Star";
import { UserContext } from "../context/UserAuthentication";
import API from "../utils/api";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Helper from "../utils/helper";

const styles = {
    button: {
        backgroundColor: "#00909e",
        color: "white",
        margin: "10px 5px",
        padding: "5px 10px"
    },
    iconStyle: {
        position: "relative",
        top: "3px",

    },
    textStyle: {
        fontWeight: "bold",
        color: "white",
        fontSize: "20px"
    }
}

function QuestionPage() {
    // This is sample of a question data model
    // ID represents the question of the ID ! 
    const { id } = useParams();
    const { loginStatus } = useContext(UserContext);
    const [theme, setTheme] = useState("twilight");
    const [btnLabel, setBtnLabel] = useState("Theme Toggle");
    // Question also contains user input
    const [question, setQuestion] = useState({});

    // Represent the submission and logging status of user codes
    const [result, setResult] = useState([]);

    useEffect(() => {
        // Go to backend search for that question by ID... and console log first :)
        renderChosenQuestion(id);
    }, []);

    // When cacheInput changes, this means that save cache Input in frontend first, then save backend 
    // useEffect(() => {
    //     API.saveUserInput(question);
    // }, [question]);

    // This function always run when the user enters this questionDisplayPage
    // If the token is not valid, they will be forwarded back to sign in page.
    // We want to make sure they are not tampering with the token
    // Validate the token first, if it is not validated, that means token has been tampered
    // If that is the case, we will just redirect to "/"
    async function checkValidToken() {
        const response = await API.authenticateLogin();
        const isValidToken = response.data.isAuthenticated;

        if (!isValidToken) {
            window.location.href = "/";
            return false;
        } else {
            return response.data;
        }
    }

    async function renderChosenQuestion(id) {
        const userData = await checkValidToken(); // If token is valid, return the user data
        const response = await API.updateAndGetLastQuestion(userData.uid, id);
        setQuestion(response.data.question);
    };

    function loadingSubmit() {
        document.getElementById("codeDiv").style.display = "none";
        document.getElementById("progressDiv").style.display = "block";

        setTimeout(function () {
            handleSubmitCode()
        }, 3000);
    };

    function loadingRun() {
        document.getElementById("codeDiv").style.display = "none";
        document.getElementById("progressDiv").style.display = "block";

        setTimeout(function () {
            handleRunCode();
        }, 3000);

    };

    async function handleRunCode() {
        checkValidToken();
        const userID = loginStatus.uid; // Or loginstatus.uid
        const runOutputs = await axios.post("/api/question/run", {
            userID,
            question
        });
        setResult(runOutputs.data)
        document.getElementById("codeDiv").style.display = "block";
        document.getElementById("progressDiv").style.display = "none";
    };

    async function handleSubmitCode() {
        checkValidToken();
        const userID = loginStatus.uid
        const submission = await axios.post("/api/question/submit", {
            userID,
            question
        });
        setResult(submission.data);
        document.getElementById("codeDiv").style.display = "block";
        document.getElementById("progressDiv").style.display = "none";
    };

    function renderMessagesInTerminal() {
        return result.event == "Run code" ? Helper.renderLoggingOutput(result) : Helper.renderTestResults(result);
    }

    // Right now saveCode only saves in the frontend... If decides to do autosave, remember 
    // To set debounce in Codeeditor. Right now it is off.
    async function saveCode(newValue) {
        checkValidToken();

        setQuestion({
            ...question,
            cacheInput: newValue
        });
    };

    function toggleEditorTheme() {
        if (theme === "xcode") {
            setTheme("twilight");
            setBtnLabel("Light");
        } else {
            setTheme("xcode");
            setBtnLabel("Dark");
        }
    };

    function renderStar(difficulty) {
        switch (difficulty) {
            case "Easy":
                return (
                    <>
                        <StarIcon  style={styles.iconStyle} />
                    </>
                )
            case "Medium":
                return (
                    <>
                        <StarIcon style={styles.iconStyle} />
                        <StarIcon style={styles.iconStyle} />
                    </>
                )
            case "Hard":
                return (
                    <>
                        <StarIcon style={styles.iconStyle} />
                        <StarIcon style={styles.iconStyle} />
                        <StarIcon style={styles.iconStyle} />
                    </>
                )
        }
    };

    function refreshCode() {
        checkValidToken();

        setQuestion({
            ...question,
            cacheInput: ""
        });
    };

    function handleShowSolution(btn) {
        if (btn === "solution") {
            document.getElementById("solutionDiv").style.display = "block";
            document.getElementById("questionDiv").style.display = "none";
        } else if (btn === "question") {
            document.getElementById("solutionDiv").style.display = "none";
            document.getElementById("questionDiv").style.display = "block";
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "80px" }}>
            <Grid container direction="row" justify="center" key={question._id} data-isSolved={question.isSolved}>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <h2 style={{ color: "#142850" }}>Question title: {question.title}</h2>
                    {/* <h4>Question Id: {id} (DELETE IN PRODUCTION)</h4> */}
                </Grid>
                <Grid item xs={12} md={6} style={{ border: "10px", borderStyle: "solid solid none solid", borderColor: "#142850", backgroundColor: "#27496d" }}>
                    <div style={{ textAlign: "center" }}>
                        <Button size="small" variant="contained" style={styles.button} onClick={() => { handleShowSolution("question") }}>
                            Question
                        </Button>
                        <Button size="small" variant="contained" style={styles.button} onClick={() => { handleShowSolution("solution") }}>
                            Solution
                        </Button>
                    </div>
                    <Grid item xs={12} id="questionDiv" style={{ padding: "0px 20px 80px 20px", overflow: "scroll", height: "294px", backgroundColor: "#27496d" }}>
                        <p style={styles.textStyle}>Category: <span style={{ color: "white" }}>{question.type}</span></p>
                        <p style={styles.textStyle}> Difficulty: <span style={{ color: "white" }}>{renderStar(question.difficulty)}</span></p>
                        <p style={styles.textStyle}>Status: <span style={{ color: "white" }}> {question.isSolved ? <span style={{color: "green"}}>Solved</span> : <span style={{color: "red"}}>Unsolved</span>} </span></p>
                        <p style={styles.textStyle}>Description:</p>
                        <p style={{ color: "white", lineHeight: "20px" }}>{question.description}</p>
                        <p style={styles.textStyle}>Sample Input 1: </p><span style={{ color: "white" }}>{JSON.stringify(question.inputOne)}</span>
                        <p style={styles.textStyle}>Sample Output 1: </p><span style={{ color: "white" }}>{JSON.stringify(question.outputOne)}</span>
                        <p style={styles.textStyle}>Sample Input 2: </p><span style={{ color: "white" }}>{JSON.stringify(question.inputTwo)}</span>
                        <p style={styles.textStyle}>Sample Output 2: </p><span style={{ color: "white" }}>{JSON.stringify(question.outputTwo)}</span>
                    </Grid>
                    {/* Solution */}
                    <Grid item xs={12} id="solutionDiv" style={{ padding: "0px 20px 20px 20px", display: "none", overflow: "scroll", backgroundColor: "#27496d" }}>
                        <CodeEditor id={"solutionEditor"} isHighLightActiveLine={false} editorTheme={theme} isReadOnly={true} code={question.solutionCode} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} id="codeDiv" style={{ border: "10px", borderStyle: "solid solid none solid", borderColor: "#142850", textAlign: "center", backgroundColor: "#27496d" }}>
                    <IconButton onClick={refreshCode} aria-label="replay">
                        <ReplayIcon size="small" style={{ color: "white", fontWeight: "bold" }} />
                    </IconButton>
                    <Button onClick={toggleEditorTheme} size="small" variant="contained" style={styles.button}>
                        {btnLabel}
                    </Button>
                    <Button size="small" onClick={loadingRun} variant="contained" style={styles.button}>
                        Run / Log
                        </Button>
                    <Button onClick={loadingSubmit} size="small" variant="contained" style={styles.button}>
                        Submit
                        </Button>
                    <Grid item xs={12}>
                        <CodeEditor id={"userEditor"} saveCode={saveCode} isHighLightActiveLine={true} editorTheme={theme} isReadOnly={false} code={question.cacheInput == "" ? question.beginningCode : question.cacheInput} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} id="progressDiv" style={{ border: "10px", borderStyle: "solid solid none solid", borderColor: "#142850", textAlign: "center", backgroundColor: "#27496d", display: "none" }}>
                    <CircularProgress size={90} style={{ color: "#03A9B9", margin: "70px auto" }} />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "200px", border: "#142850 10px solid", backgroundColor: "#27496d" }}>
                    <div id="resultDiv">
                        {renderMessagesInTerminal()}
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default QuestionPage;