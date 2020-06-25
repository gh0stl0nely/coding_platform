import React, { useState } from 'react';
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
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;