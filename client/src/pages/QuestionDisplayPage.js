import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CodeEditor from "../components/CodeEditor";

const styles = {
    button: {
        backgroundColor: "#305c8a",
        color: "white",
        margin: "10px 5px",
        padding: "5px 10px"
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
    const [codeEditorValue, setCodeEditor] = useState("")
    const [theme, setTheme] = useState("monokai");
    const [btnLabel, setBtnLabel] = useState("Theme Toggle");

    useEffect(() => {
        setCodeEditor(sampleQuestion.cacheInput)
    }, [])

    function toggleEditorTheme() {
        if (theme === "xcode") {
            setTheme("monokai");
            setBtnLabel("Light");
        } else {
            setTheme("xcode");
            setBtnLabel("Dark");
        }
    }

    const handleShowSolution = (btn) => {
        if (btn === "solution") {
            document.getElementById("solutionDiv").style.display = "block";
            document.getElementById("questionDiv").style.display = "none";
        } else if (btn === "question") {
            document.getElementById("solutionDiv").style.display = "none";
            document.getElementById("questionDiv").style.display = "block";
        }
    }

    return (
        <Container maxWidth="md">
            <Grid container direction="row" justify="center" key={sampleQuestion._id} data-isSolved={sampleQuestion.isSolved}>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <h2>Q1: {id}</h2>
                    <h2 style={{ color: "#142850" }}>{sampleQuestion.title}</h2>
                </Grid>
                <Grid item xs={12} md={6} style={{ borderStyle: "solid none none solid", borderColor: "#142850" }}>
                    <div style={{ textAlign: "center" }}>
                        <Button size="small" variant="contained" style={styles.button} onClick={() => { handleShowSolution("question") }}>
                            Question
                        </Button>
                        <Button size="small" variant="contained" style={styles.button} onClick={() => { handleShowSolution("solution") }}>
                            Solution
                        </Button>
                    </div>
                    <Grid item xs={12} id="questionDiv" style={{ padding: "0px 20px 80px 20px", overflow: "scroll", height: "294px" }}>
                        {sampleQuestion.description}
                    </Grid>
                    <Grid item xs={12} id="solutionDiv" style={{ padding: "0px 20px 80px 20px", display: "none", overflow: "scroll" }}>
                        <p>Input: </p><span>[{sampleQuestion.answers.inputs.toString()}]</span>
                        <p>Expected Outputs: </p><span>[{sampleQuestion.answers.expectedOutputs.toString()}]</span>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} style={{ borderStyle: "solid solid none solid", borderColor: "#142850", textAlign: "center" }}>
                    <IconButton aria-label="replay">
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
                        <CodeEditor editorTheme={theme} value={codeEditorValue} />
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