import React, { useState } from 'react';
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
    const options = ["linear search", "binary search", "bubble sort", "selection sort", "insertion sort"];
    const allNoneDisplay = {
        "linear search": "none",
        "binary search": "none",
        "bubble sort": "none",
        "selection sort": "none",
        "insertion sort": "none"
    };

    const [display, updateDisplay] = useState({
        "linear search": "none",
        "binary search": "none",
        "bubble sort": "none",
        "selection sort": "none",
        "insertion sort": "none"
    });

    function renderChipsOptions() {
        return options.map(item => {
            return (
                <Chips label={item} handleFunction={handleChipClick} />
            )
        })
    };

    const handleChipClick = (e) => {
        const target = e.target.innerHTML;
        updateDisplay({
            ...allNoneDisplay,
            [target] : "block"
        });
        // display[target] === "none" ? updateDisplay({ ...display, [target]: "block" }) : updateDisplay({ ...display, [target]: "none" });
    };



    return (
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Grid container style={{ padding: "20px 0px", marginTop: "10px" }} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <p>Choose the methods you want to visualize: </p>
                </Grid>
                {renderChipsOptions()}
            </Grid>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} style={{ textAlign: "center", height: "300px", backgroundColor: "#dae1e7" }}>
                        <LinearSearch />
                </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#dae1e7", paddingBottom: "30px", display: display["binary search"] }}>
                        <BinarySearch />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#dae1e7", paddingBottom: "30px", display: display["bubble sort"] }}>
                        <BubbleSort />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#dae1e7", paddingBottom: "30px", display: display["selection sort"] }}>
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