import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SimpleTab from "../components/Tab";
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CodeEditor from "../components/CodeEditor";

const styles={
    button:{
        margin: "0 5px"
    }
}

function QuestionPage() {
    // This is sample of a question data model
    // You can set CodeEditor value={cacheInput} when useEffect is called
    let { id } = useParams();
    const [theme, setTheme] = useState("monokai");

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
            inputs: [1,2,3],
            expectedOutputs: [1,3,4]
        }
    }

    function toggleEditorTheme(){
        return theme == "xcode" ? setTheme("monokai") : setTheme("xcode");
    }

    return (
        <Container maxWidth="md">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <h2>Q1: {id}</h2>
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                    <SimpleTab />
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                    <div>
                        <IconButton aria-label="replay" style={styles.button}>
                            <ReplayIcon size="small" color="primary" />
                        </IconButton>
                        <Button onClick={toggleEditorTheme} size="small" variant="contained" color="primary" style={styles.button}>
                            Toggle theme
                        </Button>
                        <Button size="small" variant="contained" color="primary" style={styles.button}>
                            Run
                        </Button>
                        <Button size="small" variant="contained" color="primary" style={styles.button}>
                            Submit Code
                        </Button>
                    </div>
                    <CodeEditor editorTheme={theme}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default QuestionPage;