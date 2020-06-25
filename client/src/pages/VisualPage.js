import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Chips from "../components/Chips";

function VisualPage() {
    return (
        <Container maxWidth="md">
            <Grid container style={{ padding: "20px 0px" }} justify="center" alignItems="center">
                <p>chips go here</p>
                <Chips name="tag" />
                <Chips name="tag" />
                <Chips name="tag" />
                <Chips name="tag" />
                <Chips name="tag" />
            </Grid>
            <Grid container justify="center" alignItems="center">
            <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                    <p>Contents go here: explaination, videoes</p>
                </Grid>
            </Grid>
        </Container>
    )
}

export default VisualPage;