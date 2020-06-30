import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CodeEditor from "../components/CodeEditor";
import StarIcon from "@material-ui/icons/Star";
import API from "../utils/api";
import { diff } from "react-ace";

const styles = {
    button: {
        backgroundColor: "#305c8a",
        color: "white",
        margin: "10px 5px",
        padding: "5px 10px"
    },
    iconStyle: {
        position: "relative",
        top: "5px"
    },
    textStyle: {
        fontWeight: "bold"
    }
}

const sampleQuestion = {
    _id: "123saddsahd",
    title: "This is Title", // Use this for title
    description: "This is description", // Use this for description
    sampleInput: 3, // Use 
    sampleOutput: 5,
    difficulty: "Hard",
    type: "Array",
    cacheInput: `function(){
        for(var i = 0; i < 3; i++){
            console.log(i);
        }
    }`, // This goes to the editor value 
    isSolved: true, // If it is solved, then status: Solved, and vice versa
    // No need to check for answers yet ! But included here for data integrity
    answers: {
        inputs: [1, 2, 3],
        expectedOutputs: [1, 3, 4]
    }
}

function QuestionPage() {
    // This is sample of a question data model
    // You can set CodeEditor value={cacheInput} when useEffect is called
    let { id } = useParams();
    const [theme, setTheme] = useState("monokai");
    const [btnLabel, setBtnLabel] = useState("Theme Toggle");
    const [question, setQuestion] = useState({});

    useEffect(() => {
        // Go to backend search for that question by ID... and console log first :)
        searchAndSetQuestion(id);
    }, []);

    async function searchAndSetQuestion(id){
        const response = await API.searchQuestionByID(id);
        console.log(response.data.question);
        setQuestion(response.data.question);
    }

    function toggleEditorTheme() {
        if (theme === "xcode") {
            setTheme("monokai");
            setBtnLabel("Light");
        } else {
            setTheme("xcode");
            setBtnLabel("Dark");
        }
    }

    function renderStar(difficulty){
        switch(difficulty){
            case "Easy":
                return (
                    <>
                     <StarIcon style={styles.iconStyle} />
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
    }

    function refreshCode(){
        console.log("We are sending this beginning code down.")
        setQuestion({
            ...question,
            cacheInput: ""
        })

    }

    function handleShowSolution(btn){
        if (btn === "solution") {
            document.getElementById("solutionDiv").style.display = "block";
            document.getElementById("questionDiv").style.display = "none";
        } else if (btn === "question") {
            document.getElementById("solutionDiv").style.display = "none";
            document.getElementById("questionDiv").style.display = "block";
        }
    }

    return (
        <Container maxWidth="md" style={{marginTop: "80px"}}>
            <Grid container direction="row" justify="center" key={question._id} data-isSolved={question.isSolved}>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <h2 style={{ color: "#142850" }}>Title: {question.title}</h2>
                    <h4>Question Id: {id} (DELETE IN PRODUCTION)</h4>
                </Grid>
                <Grid item xs={12} md={6} style={{ borderStyle: "solid solid none solid", borderColor: "#142850" }}>
                    <div style={{ textAlign: "center" }}>
                        <Button size="small" variant="contained" style={styles.button} onClick={() => { handleShowSolution("question") }}>
                            Question
                        </Button>
                        <Button size="small" variant="contained" style={styles.button} onClick={() => { handleShowSolution("solution") }}>
                            Solution
                        </Button>
                    </div>
                    <Grid item xs={12} id="questionDiv" style={{ padding: "0px 20px 80px 20px", overflow: "scroll", height: "294px" }}>
                        <p style={styles.textStyle}>Category: <span>{question.type}</span></p>
                        <p style={styles.textStyle}> Difficulty: <span>{renderStar(question.difficulty)}</span></p>
                        <p style={styles.textStyle}>Status: <span> {question.isSolved ? "Solved" : "Unsolved"} </span></p>
                        <p style={styles.textStyle}>Description:</p>
                        {question.description}
                        <p style={styles.textStyle}>Input One: </p><span>{JSON.stringify(question.inputOne)}</span>
                        <p style={styles.textStyle}>Output One: </p><span>{JSON.stringify(question.outputOne)}</span>
                        <p style={styles.textStyle}>Input Two: </p><span>{JSON.stringify(question.inputTwo)}</span>
                        <p style={styles.textStyle}>Output Two: </p><span>{JSON.stringify(question.outputTwo)}</span>
                    </Grid>
                    {/* Solution */}
                    <Grid item xs={12} id="solutionDiv" style={{ padding: "0px 20px 80px 20px", display: "none", overflow: "scroll" }}>
                        <CodeEditor id={"solutionEditor"} isHighLightActiveLine={false} editorTheme={theme} isReadOnly={true} code={question.solutionCode} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} style={{ borderStyle: "solid solid none solid", borderColor: "#142850", textAlign: "center" }}>
                    <IconButton onClick={refreshCode} aria-label="replay">
                        <ReplayIcon size="small" style={{ color: "#305c8a", fontWeight: "bold" }} />
                    </IconButton>
                    <Button onClick={toggleEditorTheme} size="small" variant="contained" style={styles.button}>
                        {btnLabel}
                    </Button>
                    <Button size="small" variant="contained" style={styles.button}>
                        Run
                        </Button>
                    <Button size="small" variant="contained" style={styles.button}>
                        Submit Code
                        </Button>
                    <Grid item xs={12}>
                        <CodeEditor id={"userEditor"} isHighLightActiveLine={true} editorTheme={theme} isReadOnly={false} code={question.cacheInput == "" ? question.beginningCode : question.cacheInput} />
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "200px", border: "black 2px solid" }}>
                    <p>console log goes here</p>
                </Grid>
            </Grid>
        </Container>
    )
}

export default QuestionPage;