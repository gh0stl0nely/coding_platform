import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';
import { truncate } from 'fs';

export default function DepthFirstSearch() {

    const [finalGrid, updateFinalGrid] = useState([]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray, updateIsGeneratedNewGrid] = useState(false);
    const [rowAndColumn, setRowAndColumn] = useState({
        row: 10,
        col: 10
    });
    const [startingNode, setStartNode] = useState({});
    const [speed, setSpeed] = useState("Fast");

    function DFS() {
        // Visited is the things that we already visit

        // Direction can be:
            // Left = col - 1
            // Right = col + 1
            // Up = row - 1
            // Down = row + 1
        let visited = [];
        let toVisit = [];

        toVisit.push(startingNode);

        const timer = setInterval(() => {
            // Ending condition

            if(toVisit.length == 0){
                alert("No more node to visit!");
                updateSearchStatus(true);
                clearInterval(timer);
                return;
            }

            const current = toVisit.pop(); // pop always get last one, (FILO)
            // Shift is gets first one (FIFO) - BFS
        
            const col = current.col;
            const row = current.row;

            // CHeck out of bound
            if(!(row < 0) && !(col < 0) && !(row == rowAndColumn.row) && !(col == rowAndColumn.col)){

                if(!isVisited(row,col,visited) && !isWall(row,col)){
                    // Visualize current node
                    visualizeCurrentNode(row,col);
    
                    if(isEndNode(current)){
                        alert("End Node Found!");
                        updateSearchStatus(true);
                        clearInterval(timer);
                        return;
                    }
    
                    visited.push(current);
    
                    // Put more nodes to the stack
                    checkSurroundingDirections(row,col, toVisit);
                }

            }

        }, 150);
    };

    function isWall(row,col){
        return finalGrid[row][col].color == "black" ? true : false;
    }

    function checkSurroundingDirections(row,col,toVisit){
        // Only go to direction that are not null...abs
        
        // Left
        if(col - 1 >= 0 && !isWall(row, col - 1)){
            toVisit.push(finalGrid[row][col - 1]);
        }

        // Right
        if(col + 1 < rowAndColumn.col && !isWall(row, col + 1)){
            toVisit.push(finalGrid[row][col + 1])
        }

        // Up
        if(row - 1 >= 0 && !isWall(row - 1, col)){
            toVisit.push(finalGrid[row - 1][col])
        }

        // Down
        if(row + 1 < rowAndColumn.row && !isWall(row + 1, col)){
            toVisit.push(finalGrid[row + 1][col])
        }
    }

    function isVisited(row,col, visited){
        for(let i = 0; i < visited.length ;i++){
            if(visited[i].row == row && visited[i].col == col){
                return true;
            }
        }
        return false;
    }

    function visualizeCurrentNode(row,col){
        const currentNode = {
            ...finalGrid[row][col],
            color: "#00FA9A"
        };

        const newGrid = [...finalGrid];
        newGrid[row][col] = currentNode;
        updateFinalGrid(newGrid);
    };

    function isEndNode(node){
        return node.color == 'red' ? true : false;
    };

    function handleChoice(e) {
        const { name, value } = e.target;
        setRowAndColumn({
            ...rowAndColumn,
            [name]: value
        });
    };

    // If row = 0; col = grid length - 1
    // if row = grid length - 1 and col = 0
    function generateRandomGrid() {
        let generatedGrid = [];
        const totalRow = rowAndColumn.row;
        
        const { startNode, endNode } = generateStartAndEnd();

        for (let row = 0; row < totalRow; row++) {
            const tempRow = [];
            const totalCol = rowAndColumn.col;
            for(let col = 0; col < totalCol; col++){
                const randomNumber = Math.floor(Math.random() * 5);
                if(row == startNode.row && col == startNode.col){
                    tempRow.push(startNode);
                    setStartNode(startNode);
                } else if(row == endNode.row && col == endNode.col){
                    tempRow.push(endNode);
                } else {
                    randomNumber == 0 ? tempRow.push({
                        color: 'black',
                        row: row,
                        col: col
                    }) : tempRow.push({
                        color: 'white',
                        row: row,
                        col: col
                    });
                }
            };
            generatedGrid.push(tempRow);
        };

        updateFinalGrid(generatedGrid);
        updateIsGeneratedNewGrid(true);
    };

    function generateStartAndEnd(){
        let startNode = {
            color: 'green',
            row: Math.floor(Math.random() * rowAndColumn.row),
            col: Math.floor(Math.random() * rowAndColumn.col)
        };
        let endNode = {
            color: 'red',
            row: Math.floor(Math.random() * rowAndColumn.row),
            col: Math.floor(Math.random() * rowAndColumn.col)
        };

        while(startNode.row == endNode.row && endNode.col == startNode.col){
            startNode = {
                color: 'green',
                row: Math.floor(Math.random() * rowAndColumn.row),
                col: Math.floor(Math.random() * rowAndColumn.col)
            };

            endNode = {
                color: 'red',
                row: Math.floor(Math.random() * rowAndColumn.row),
                col: Math.floor(Math.random() * rowAndColumn.col)
            };
        }
        
        return {
            startNode,
            endNode
        }
    }

    function renderFinalGrid() {
        return (
            finalGrid.map(row => {
                return (
                    <div style={{ width: "100%" }}>
                        {row.map(col => {
                            if (!isNaN(col)) {
                                return <Node value={""} isGridNode={true} />
                            } else {
                                return <Node value={""} isGridNode={true} color={col.color} />
                            }
                        })}
                    </div>
                )
            })
        )
    }

    return (
        <div>
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Depth First Search</p>
            <p style={{ color: "#142850", fontSize: "2.5vw", fontFamily: 'Vidaloka' }}>Visualization is best viewed on full screen.</p>
            <TextField
                select
                onChange={handleChoice}
                defaultValue={10}
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
                defaultValue={10}
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
                    Generate Grid
            </Button>
            </div>
            <div style={{ marginTop: "25px" }}>
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewGrid(false); DFS() }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                    Depth First Search
            </Button>
            </div>
            <Grid container direction="row" style={{ marginTop: "20px" }}>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "#00FA9A", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Traversing path</p>
                </Grid>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "black", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Wall</p>
                </Grid>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "green", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Start Node (Node to start from)</p>
                </Grid>
                <Grid item xs={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>End Node (Node to reach)</p>
                </Grid>
            </Grid>
            <div style={{ marginTop: "30px" }}>
                {renderFinalGrid()}
            </div>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Worst case time complexity: </p>
                <p style={{ fontWeight: "bold" }}>Best case time complexity: </p>
                <p style={{ fontWeight: "bold" }}>Space complexity: </p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <p style={{ paddingLeft: "20px", paddingRight: "20px" }}></p>
            </Grid>
        </div>
    )
}