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
import DepthFirstSearch from "../algorithms/DepthFirstSearch.js";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch.js";
import Copyright from "../components/Copyright";

function VisualPage() {
    const options = ["Linear Search", "Binary Search", "Bubble Sort", "Selection Sort", "Insertion Sort", "Depth First Search", "Breadth First Search"];
    
    const allDisplayNone = {
        "linear search": "none",
        "binary search": "none",
        "bubble sort": "none",
        "selection sort": "none",
        "insertion sort": "none",
        "depth first search": "none",
        "breadth first search": "none",
    };

    const [display, updateDisplay] = useState({
        "linear search": "none",
        "binary search": "none",
        "bubble sort": "none",
        "selection sort": "none",
        "insertion sort": "none",
        "depth first search": "none",
        "breadth first search": "none"
    });

    function renderChipsOptions() {
        return options.map(item => {
            return (
                <Chips name={item} handleFunction={handleChipClick} />
            )
        })
    };

    const handleChipClick = (e) => {
        e.stopPropagation();
        const target = e.target.innerHTML.toLowerCase();
        // Set everything to normal and then update
        const newState = {
            ...allDisplayNone,
            [target] : "block"
        };

        updateDisplay(newState);
    };



    return (
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Grid container style={{ padding: "20px 0px", marginTop: "10px" }} justify="center" alignItems="center">
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <p style={{fontSize: "20px"}}>Choose the algorithm methods you want to visualize </p>
                </Grid>
                {renderChipsOptions()}
            </Grid>
            <Grid container justify="center" alignItems="center">
                <Grid container justify="center" alignItems="center" style={{ backgroundColor: "#E8EFF5", minHeight: "300px",borderRadius: "20px" }}>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["linear search"], border: "5px solid #27496d", borderRadius: "20px"}}>
                        <LinearSearch />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["binary search"], border: "5px solid #27496d", borderRadius: "20px" }}>
                        <BinarySearch />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["bubble sort"], border: "5px solid #27496d", borderRadius: "20px" }}>
                        <BubbleSort />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["selection sort"], border: "5px solid #27496d", borderRadius: "20px" }}>
                        <SelectionSort />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["insertion sort"], border: "5px solid #27496d", borderRadius: "20px" }}>
                        <InsertionSort />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["depth first search"], border: "5px solid #27496d", borderRadius: "20px" }}>
                        <DepthFirstSearch />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", backgroundColor: "#E8EFF5", paddingBottom: "30px", display: display["breadth first search"], border: "5px solid #27496d", borderRadius: "20px" }}>
                        <BreadthFirstSearch />
                    </Grid>
                </Grid>
            </Grid>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default VisualPage;