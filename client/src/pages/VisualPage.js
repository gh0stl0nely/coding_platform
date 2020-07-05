import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Chips from "../components/Chips";
import Box from '@material-ui/core/Box';
import LinearSearch from "../algorithms/LinearSearch";
import BinarySearch from "../algorithms/BinarySearch";
import Copyright from "../components/Copyright";

function VisualPage() {
    return (
        <Container maxWidth="md" style={{ marginTop: "50px" }}>
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
                    <LinearSearch />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                    <BinarySearch />
            </Grid>
            </Grid>
            
            <Box mt={8}>
          <Copyright />
        </Box>
        </Container>
    )
}

export default VisualPage;