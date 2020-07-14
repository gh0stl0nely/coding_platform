import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';

export default function DepthFirstSearch() {

    const [finalGrid, updateFinalGrid] = useState([]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray, updateIsGeneratedNewGrid] = useState(false);
    const [rowAndColumn, setRowAndColumn] = useState({
        row: 5,
        col: 5
    });

    // Left = col - 1
    // Right = col + 1
    // Up = row - 1
    // Down = row + 1
    function DFS() {
        // Start Depth first search
        const timer = setTimeout(() => {
            
        });

    };

    function handleChoice(e) {
        const { name, value } = e.target;
        setRowAndColumn({
            ...rowAndColumn,
            [name]: value
        });
    };

    // True means the current can go to direction, if not then u have to chooose other
    function generateRandomGrid() {
        let generatedGrid = [];
        const totalRow = rowAndColumn.row;

        // If row = 0; col = grid length - 1
        let end = {
            color: 'red',
            left: true,
            right: true,
            up: true,
            down: true
        };

        // if row = grid length - 1 and col = 0
        let start = {
            color: 'green',
            left: true,
            right: true,
            up: true,
            down: true
        };

        for (let row = 0; row < totalRow; row++) {
            const tempRow = [];
            const totalCol = rowAndColumn.col;
            for(let col = 0; col < totalCol; col++){
                if(row == totalRow - 1 && col == 0){
                    tempRow.push(start);
                } else if(row == 0 && col == totalCol - 1){
                    tempRow.push(end);
                } else {
                    tempRow.push({
                        color: 'blue',
                        left: true,
                        right: true,
                        up: true,
                        down: true
                    });
                }
            };
            generatedGrid.push(tempRow);
        };

        updateFinalGrid(generatedGrid);
        updateIsGeneratedNewGrid(true);
    };

    function renderFinalArray() {
        return (
            finalGrid.map(row => {
                return (
                    <div style={{width: "100%"}}>
                        {row.map(col => {
                            if (!isNaN(col)) {
                                return <Node value={""} isGridNode={true} />
                            } else {
                                return <Node value={""} isGridNode={true} color={col.color} />
                            }
                        })}
                    </div>
                )
            }
        )  
    )
}

    return (
        <div>
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Depth First Search</p>
            <TextField
                select
                onChange={handleChoice}
                defaultValue={5}
                disabled={isFoundAnswer ? false : true}
                helperText="Choose number of column"
                name="col"
            >
                {[5, 6, 7, 8, 9, 10, 11, 12].map((number, index) => (
                    <MenuItem key={index} value={number}>
                        {number}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                onChange={handleChoice}
                defaultValue={5}
                disabled={isFoundAnswer ? false : true}
                helperText="Choose number of Row"
                name="row"
            >
                {[5, 6, 7, 8, 9, 10, 11, 12].map((number, index) => (
                    <MenuItem key={index} value={number}>
                        {number}
                    </MenuItem>
                ))}
            </TextField>

            <div style={{ marginTop: "25px" }}>
                <Button id="gen-random-array-btn" onClick={generateRandomGrid} variant="contained" disabled={isFoundAnswer ? false : true} color="primary">
                    Generate Random Grid
            </Button>
            </div>
            <div style={{ marginTop: "25px" }}>
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewGrid(false); DFS() }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                    Depth First Search
            </Button>
            </div>
            <Grid container direction="row" style={{marginTop: "20px"}}>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "#00FA9A", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Correct order. Move to next number</p>
                </Grid>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "green", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Found the correct spot to insert</p>
                </Grid>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Wrong order, looking for the correct spot to insert</p>
                </Grid>
            </Grid>
            <div style={{ marginTop: "30px" }}>
                {renderFinalArray()}
            </div>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Worst case time complexity: </p>
                <p style={{ fontWeight: "bold" }}>Best case time complexity: </p>
                <p style={{ fontWeight: "bold" }}>Space complexity: </p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}></p>
                {/* <p style={{paddingLeft: "20px", paddingRight: "20px"}}>Be mindful that, under the hood, because inserting into an array actually takes O(N) time complexity due to the need for index shift, we will be making used of swapping in order to emulate index shifting. Compared to bubble sort and selection sort, insertion sort can result in a O(N) time complexity only when the array is almost or already sorted (Best case). No extra space needed.</p> */}
            </Grid>
        </div>
    )
}