import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

export default function BreadthFirstSearch() {
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);

    const [finalGrid, updateFinalGrid] = useState([]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray, updateIsGeneratedNewGrid] = useState(false);
    const [rowAndColumn, setRowAndColumn] = useState({
        row: 10,
        col: 10
    });
    const [startingNode, setStartNode] = useState({});
    const [speed, setSpeed] = useState(110);

    function BFS() {
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
                setWarning(true);
                updateSearchStatus(true);
                clearInterval(timer);
                return;
            }

            const current = toVisit.shift(); 
        
            const col = current.col;
            const row = current.row;

            // CHeck out of bound
            if(!(row < 0) && !(col < 0) && !(row == rowAndColumn.row) && !(col == rowAndColumn.col)){

                if(!isVisited(row,col,visited) && !isWall(row,col)){
                    // Visualize current node
                    visualizeCurrentNode(row,col);
    
                    if(isEndNode(current)){
                        setSuccess(true);
                        updateSearchStatus(true);
                        clearInterval(timer);
                        return;
                    }
    
                    visited.push(current);
    
                    // Put more nodes to the stack
                    checkSurroundingDirections(row,col, toVisit);
                }

            }

        }, speed);
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

    function handleSpeed(e){
        const { value } = e.target;
        switch(value){
            case "Slow":
                setSpeed(200);
                break;
            case "Medium":
                setSpeed(110);
                break;
            case "Fast":
                setSpeed(50);
                break;
        }
    }

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
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Breadth First Search</p>
            <p style={{ color: "#142850", fontSize: "2.5vw", fontFamily: 'Vidaloka' }}>Visualization is best viewed on full screen.</p>
            <TextField
            style={{marginRight: '3vw'}}
                select
                onChange={handleChoice}
                defaultValue={10}
                disabled={isFoundAnswer ? false : true}
                helperText="Choose number of column"
                name="col"
            >
                {[10, 11, 12,13,14,15,16,17].map((number, index) => (
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
                {[10, 11, 12,13,14,15,16,17].map((number, index) => (
                    <MenuItem key={index} value={number}>
                        {number}
                    </MenuItem>
                ))}
            </TextField>
            <div>
                <TextField
                    select
                    defaultValue={"Medium"}
                    disabled={isFoundAnswer ? false : true}
                    helperText="Choose algorithm speed"
                    name="speed"
                    onChange={handleSpeed}
                >
                    {["Slow", "Medium", "Fast"].map((value, index) => (
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div style={{ marginTop: "25px" }}>
                <Button id="gen-random-array-btn" onClick={generateRandomGrid} variant="contained" disabled={isFoundAnswer ? false : true} color="primary">
                        Generate Grid
                </Button>
            </div>
            <div style={{ marginTop: "25px" }}>
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewGrid(false); BFS() }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                        Breadth First Search
                </Button>
            </div>
            <Grid container direction="row" style={{ marginTop: "20px" }}>
                <Grid item xs={4} md={5}>
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
                <Grid item xs={4} md={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "green", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Start Node (Node to start from)</p>
                </Grid>
                <Grid item xs={4} md={5}>
                    <div style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>End Node (Node to reach)</p>
                </Grid>
            </Grid>
            <div>
                <Collapse in={success}>
                    <Alert
                        variant="filled"
                        style={{ width: '50%', margin: '10px auto' }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSuccess(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        End Node Found!
                    </Alert>
                </Collapse>
                <Collapse in={warning}>
                    <Alert
                        variant="filled"
                        severity="warning"
                        style={{ width: '50%', margin: '10px auto' }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setWarning(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        No more node to visit!
                    </Alert>
                </Collapse>
            </div>
            <div style={{ marginTop: "30px" }}>
                {renderFinalGrid()}
            </div>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Time complexity if using Adjacency Matrix (or 2D array): O(Vertices<sup>2</sup>) </p>
                <p style={{ fontWeight: "bold" }}>Time complexity if using Adjacency List : O(Vertices + Edges) </p>
                <p style={{ fontWeight: "bold" }}>Space complexity: O(Vertices)</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <p style={{ paddingLeft: "20px", paddingRight: "20px" }}>If you haven't read the explanation of Depth First Search, we recommend you do because the idea behind Breadth First Search is quite similar to Depth First Search. Two major differences are that Breadth First Search checks for End Node in its immediate surrounding squares before moving further out, hence "breadth first". Breadth First Search is faster if the End Node is closer to the Start Node.</p>
                <p style={{ paddingLeft: "20px", paddingRight: "20px" }}>Since time complexity depends on the data structure that we use to implement the graph, the explanation is similar to that of Depth First Search.</p>
                
                <p style={{ paddingLeft: "20px", paddingRight: "20px" }}>Although space complexity is almost identical to Depth First Search, we still need to beware as to how it stores all vertices to visit. In the case of Depth First Search, we use a STACK, but Breadth First Search makes use of a QUEUE. Think of a QUEUE as a line up, what comes in first, goes out first. Because immediate neighborings edges of a vertex are pushed onto the QUEUE first, thus the algorithm will visit those first.</p>
            </Grid>
        </div>
    )
}