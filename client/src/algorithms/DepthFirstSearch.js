import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { truncate } from 'fs';

export default function DepthFirstSearch() {
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

            if (toVisit.length == 0) {
                setWarning(true);
                updateSearchStatus(true);
                clearInterval(timer);
                return;
            }

            const current = toVisit.pop(); // pop always get last one, (FILO)
            // Shift is gets first one (FIFO) - BFS

            const col = current.col;
            const row = current.row;

            // CHeck out of bound
            if (!(row < 0) && !(col < 0) && !(row == rowAndColumn.row) && !(col == rowAndColumn.col)) {

                if (!isVisited(row, col, visited) && !isWall(row, col)) {
                    // Visualize current node
                    visualizeCurrentNode(row, col);

                    if (isEndNode(current)) {
                        setSuccess(true);
                        updateSearchStatus(true);
                        clearInterval(timer);
                        return;
                    }

                    visited.push(current);

                    // Put more nodes to the stack
                    checkSurroundingDirections(row, col, toVisit);
                }

            }

        }, speed);
    };

    function isWall(row, col) {
        return finalGrid[row][col].color == "black" ? true : false;
    }

    function checkSurroundingDirections(row, col, toVisit) {
        // Only go to direction that are not null...abs

        // Left
        if (col - 1 >= 0 && !isWall(row, col - 1)) {
            toVisit.push(finalGrid[row][col - 1]);
        }

        // Right
        if (col + 1 < rowAndColumn.col && !isWall(row, col + 1)) {
            toVisit.push(finalGrid[row][col + 1])
        }

        // Up
        if (row - 1 >= 0 && !isWall(row - 1, col)) {
            toVisit.push(finalGrid[row - 1][col])
        }

        // Down
        if (row + 1 < rowAndColumn.row && !isWall(row + 1, col)) {
            toVisit.push(finalGrid[row + 1][col])
        }
    }

    function isVisited(row, col, visited) {
        for (let i = 0; i < visited.length; i++) {
            if (visited[i].row == row && visited[i].col == col) {
                return true;
            }
        }
        return false;
    }

    function visualizeCurrentNode(row, col) {
        const currentNode = {
            ...finalGrid[row][col],
            color: "#00FA9A"
        };

        const newGrid = [...finalGrid];
        newGrid[row][col] = currentNode;
        updateFinalGrid(newGrid);
    };

    function isEndNode(node) {
        return node.color == 'red' ? true : false;
    };

    function handleChoice(e) {
        const { name, value } = e.target;
        setRowAndColumn({
            ...rowAndColumn,
            [name]: value
        });
    };
    function handleSpeed(e) {
        const { value } = e.target;
        switch (value) {
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
        setSuccess(false);
        setWarning(false);

        let generatedGrid = [];
        const totalRow = rowAndColumn.row;

        const { startNode, endNode } = generateStartAndEnd();

        for (let row = 0; row < totalRow; row++) {
            const tempRow = [];
            const totalCol = rowAndColumn.col;
            for (let col = 0; col < totalCol; col++) {
                const randomNumber = Math.floor(Math.random() * 5);
                if (row == startNode.row && col == startNode.col) {
                    tempRow.push(startNode);
                    setStartNode(startNode);
                } else if (row == endNode.row && col == endNode.col) {
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

    function generateStartAndEnd() {
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

        while (startNode.row == endNode.row && endNode.col == startNode.col) {
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
                style={{ marginRight: '3vw' }}
                select
                onChange={handleChoice}
                defaultValue={10}
                disabled={isFoundAnswer ? false : true}
                helperText="Choose number of column"
                name="col"
            >
                {[10, 11, 12, 13, 14, 15, 16, 17].map((number, index) => (
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
                {[10, 11, 12, 13, 14, 15, 16, 17].map((number, index) => (
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
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewGrid(false); DFS() }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                    Depth First Search
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
            <div style={{ marginTop: "20px" }}>
                {renderFinalGrid()}
            </div>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Time complexity if using Adjacency Matrix (or 2D array): O(Vertices<sup>2</sup>) </p>
                <p style={{ fontWeight: "bold" }}>Time complexity if using Adjacency List : O(Vertices + Edges) </p>
                <p style={{ fontWeight: "bold" }}>Space complexity: O(Vertices)</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px", padding: '0px 40px' }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <div style={{ textAlign: "justify" }}>
                    <p>To be fundamentally prepared for coding interview, one needs to know about Depth First Search. Depth First Search is a type of graph & tree traversal algorithm that, literally, searches a graph, tree or, in our case, a 2D array, DEEPLY. Each squares on the graph are called VERTICES and each neightboring squares (left, right, top, under) are EDGES. Notice in the exampe above, the traversal path goes very DEEP - meaning the path will go straight until it hits a Wall, is out of bound or the End Node in red is found. Depth First Search is faster if the End Node is further to the Start Node.</p>
                    <p>In order to analyze the complexity, we should consider our graph implementation. Normally graphs are implemented using a 2D array (or Adjacency Matrix) or a 1D array of LinkedList (or Adjacency List). We are using in our implementation Adjacency Matrix for simplicity. Each square on the 2D Matrix are represented by its position in terms of row and column; for instance the very top left node is where row = 0 and column = 0.</p>
                    <p>O(Vertices<sup>2</sup>) = O(Vertices * Vertices) - essentially means that we are traversing every single vertices (or squares) in the matrix more than once. Every vertex will look at its neighboring squares to determine whether it should keep deeply search its path or move onto another direction.</p>
                    <p>We are seeing something new here, a space complexity of O(Vertices). Why is that? Under the hood, the algorithm keeps track of all vertices to visit next in a STACK. If there are 10 squares (5 rows and 5 columns), in the worst case, we might need to push all 10 squares in our STACK to track until the End Node is eventually found. We will essentially cover STACK in the future, but in essence, a STACK or Queue (in case of Breadth First Search), are more efficient implementation of an Array. Note that we are not recreating the 2D Matrix, but only pushing specific visited vertex ONCE onto the STACK (or 1D array)</p>
                </div>

            </Grid>
        </div>
    )
}