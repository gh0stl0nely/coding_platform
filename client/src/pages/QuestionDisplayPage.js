import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
// import { questionList } from "../utils/question";

const useStyles = makeStyles(theme => ({
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
        fontSize: "20px",
        textDecoration: "underline"
    }
}));

function QuestionPage() {
    const classes = useStyles();
    // This is sample of a question data model
    // ID represents the question of the ID ! 
    const { questionTitle } = useParams();
    // alert(title);
    const { loginStatus } = useContext(UserContext);
    const [theme, setTheme] = useState("twilight");
    const [btnLabel, setBtnLabel] = useState("Theme Toggle");
    // Question also contains user input
    const [question, setQuestion] = useState({});

    // Represent the submission and logging status of user codes
    const [result, setResult] = useState([]);

    useEffect(() => {
        // Go to backend search for that question by ID... and console log first :)
        renderChosenQuestion(questionTitle);
    }, []);

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

    async function renderChosenQuestion(questionTitle) {
        const userData = await checkValidToken(); // If token is valid, return the user data
        const response = await API.updateAndGetLastQuestion(userData.uid, questionTitle);
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
        const userInput = {
            title: question.title,
            cacheInput: question.cacheInput
        };
        const runOutputs = await axios.post("/api/question/run", {
            userID,
            userInput
        });
        setResult(runOutputs.data)
        document.getElementById("codeDiv").style.display = "block";
        document.getElementById("progressDiv").style.display = "none";
    };

    async function handleSubmitCode() {
        checkValidToken();
        const userID = loginStatus.uid;
        const userInput = {
            title: question.title,
            cacheInput: question.cacheInput
        };

        const submission = await axios.post("/api/question/submit", {
            userID,
            userInput
        });
        setResult(submission.data);
        document.getElementById("codeDiv").style.display = "block";
        document.getElementById("progressDiv").style.display = "none";
    };

    function renderMessagesInTerminal() {
        return result.event === "Run code" ? Helper.renderLoggingOutput(result) : Helper.renderTestResults(result);
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
                        <StarIcon className={classes.iconStyle} />
                    </>
                )
            case "Medium":
                return (
                    <>
                        <StarIcon className={classes.iconStyle} />
                        <StarIcon className={classes.iconStyle} />
                    </>
                )
            case "Hard":
                return (
                    <>
                        <StarIcon className={classes.iconStyle} />
                        <StarIcon className={classes.iconStyle} />
                        <StarIcon className={classes.iconStyle} />
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

    function renderInput(input) {
        if (!Array.isArray(input) && typeof input === 'object' && input !== null) {
            const values = Object.values(input);
            const resultingString = values.map((value, index) => {
                return (index !== values.length - 1) ? `Args ${index + 1} = ${JSON.stringify(value)} , ` : `Args ${index + 1} = ${JSON.stringify(value)}`
            }).join("");

            return resultingString;
        }

        // console.log("Not object")
        return JSON.stringify(input);

    }

    return (
        <Container style={{ marginTop: "80px", padding: '0px' }}>
            <Grid container direction="row" justify="center" key={question._id} data-isSolved={question.isSolved}>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <h1 style={{ color: "#142850" }}>{question.title}</h1>
                </Grid>
                <Grid item xs={12} md={6} style={{ border: '10px', borderStyle: "solid solid none solid", borderColor: "#142850", backgroundColor: "#27496d" }}>
                    <div style={{ textAlign: "center" }}>
                        <Button size="small" variant="contained" className={classes.button} onClick={() => { handleShowSolution("question") }}>
                            Question
                        </Button>
                        <Button size="small" variant="contained" className={classes.button} onClick={() => { handleShowSolution("solution") }}>
                            Solution
                        </Button>
                    </div>
                    <Grid item xs={12} id="questionDiv" style={{ padding: "0px 20px 80px 40px", overflow: "scroll", height: "294px", backgroundColor: "#27496d" }}>
                        <p className={classes.textStyle} style={{ display: 'inline-block' }}>Category:</p><span style={{ fontSize: "20px", color: "white", fontWeight: 'bold' }}> {question.questionType}</span>
                        <p className={classes.textStyle}> Difficulty:<span style={{ color: "white", textDecoration: "none" }}>{renderStar(question.difficulty)}</span></p>
                        <p className={classes.textStyle} style={{ display: 'inline-block' }}>Status: </p>{question.isSolved ? <span style={{ fontSize: "20px",color: "#79FE4F", fontWeight: 'bold' }}> Solved</span> : <span style={{ fontSize: "20px",color: "#FF4343", fontWeight: 'bold'}}> Unsolved</span>}
                        <p className={classes.textStyle}>Description:</p>
                        <p style={{ color: "white", lineHeight: "20px" }}>{question.description}</p>
                        <p className={classes.textStyle}>Sample Input 1: </p><span style={{ color: "white" }}>{renderInput(question.inputOne)}</span>
                        <p className={classes.textStyle}>Sample Output 1: </p><span style={{ color: "white" }}>{JSON.stringify(question.outputOne)}</span>
                        <p className={classes.textStyle}>Sample Input 2: </p><span style={{ color: "white" }}>{renderInput(question.inputTwo)}</span>
                        <p className={classes.textStyle}>Sample Output 2: </p><span style={{ color: "white" }}>{JSON.stringify(question.outputTwo)}</span>
                    </Grid>
                    {/* Solution */}
                    <Grid item xs={12} id="solutionDiv" style={{ display: "none", overflow: "scroll", backgroundColor: "#27496d" }}>
                        <CodeEditor id={"solutionEditor"} isHighLightActiveLine={false} editorTheme={theme} isReadOnly={true} code={question.solutionCode} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} id="codeDiv" style={{ border: '10px', borderStyle: "solid solid none solid", borderColor: "#142850", backgroundColor: "#27496d", textAlign: "center"  }}>
                    <IconButton onClick={refreshCode} aria-label="replay">
                        <ReplayIcon size="small" style={{ color: "white", fontWeight: "bold" }} />
                    </IconButton>
                    <Button onClick={toggleEditorTheme} size="small" variant="contained" className={classes.button}  >
                        {btnLabel}
                    </Button>
                    <Button size="small" onClick={loadingRun} variant="contained" className={classes.button}  >
                        Run / Log
                        </Button>
                    <Button onClick={loadingSubmit} size="small" variant="contained" className={classes.button} >
                        Submit
                        </Button>
                    <Grid item xs={12}>
                        <CodeEditor id={"userEditor"} saveCode={saveCode} isHighLightActiveLine={true} editorTheme={theme} isReadOnly={false} code={question.cacheInput === "" ? question.beginningCode : question.cacheInput} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} id="progressDiv" style={{ border: "10px", borderStyle: "solid solid none solid", borderColor: "#142850", textAlign: "center", backgroundColor: "#27496d", display: "none" }}>
                    <CircularProgress size={90} style={{ color: "#03A9B9", margin: "70px auto" }} />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "200px", border: "#142850 10px solid", backgroundColor: "#27496d", overflow: "scroll" }}>
                    <div id="resultDiv">
                        {renderMessagesInTerminal()}
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default QuestionPage;