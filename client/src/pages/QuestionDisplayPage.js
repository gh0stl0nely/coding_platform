import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SimpleTab from "../components/Tab";
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles={
    button:{
        margin: "0 5px"
    }
}

function QuestionPage() {
    return (
        <Container maxWidth="md">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <h2>Q1: question name</h2>
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                    <SimpleTab />
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                    <div>
                        <IconButton aria-label="replay" style={styles.button}>
                            <ReplayIcon size="small" color="primary" />
                        </IconButton>
                        <Button size="small" variant="contained" color="primary" style={styles.button}>
                            Run
                        </Button>
                        <Button size="small" variant="contained" color="primary" style={styles.button}>
                            Submit Code
                        </Button>
                    </div>
                    <p>Code Editor here</p>
                </Grid>
            </Grid>
        </Container>
    )
}

export default QuestionPage;