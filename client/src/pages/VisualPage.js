import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Chips from "../components/Chips";

function VisualPage() {
    return(
        <Container maxWidth="md">
        <Grid container direction="row" justify="center" alignItems="center">
            <p>chips go here</p>
            <Chips name="tag"/>
            <Chips name="tag"/>
            <Chips name="tag"/>
            <Chips name="tag"/>
            <Chips name="tag"/>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" style={{height: "300px", backgroundColor: "#dae1e7"}}>
            <p>Contents go here: explaination, videoes</p>
        </Grid>
    </Container>
    )
}

export default VisualPage;