import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Chips from "../components/Chips";
import Box from '@material-ui/core/Box';
import LinearSearch from "../algorithms/LinearSearch";
import BinarySearch from "../algorithms/BinarySearch.js";
import BubbleSort from "../algorithms/BubbleSort.js";
import SelectionSort from "../algorithms/SelectionSort.js";
import InsertionSort from "../algorithms/InsertionSort.js";
import Copyright from "../components/Copyright";

function VisualPage() {
    const options = ["linear search", "binary search", "bubble sort"]

    function renderChips() {
        return options.map(item => {
            return <Chips name={item} />
        })
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: "50px"}}>
            <Grid container style={{ padding: "20px 0px" }} justify="center" alignItems="center">
                {renderChips()}
            </Grid>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                        <LinearSearch />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                        <BinarySearch />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                        <BubbleSort />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                        <SelectionSort />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                        <InsertionSort />
                </Grid>
            </Grid>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default VisualPage;