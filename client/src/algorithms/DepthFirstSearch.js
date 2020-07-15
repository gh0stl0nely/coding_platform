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

    let wall = {
        color: 'black'
    };


    function DFS(currentRow, currentCol, direction) {
        // Direction can be:
            // Left = col - 1
            // Right = col + 1
            // Up = row - 1
            // Down = row + 1
        
        const currentNode = finalGrid[currentRow][currentCol];
       
        // Check if current node is the end node
        if(isEndNode(currentNode)){
            alert("FOUND END NODE");
            visualizeCurrentNode(currentRow,currentCol);
            updateSearchStatus(true);
            return;
        };

        if(isSurroundedByWall(currentNode)){
            alert("Cannot find a path. End algorithm.");
            updateSearchStatus(true);
            return;
        }
        
        visualizeCurrentNode(currentRow,currentCol);

        if(isNextNodeOutOfBound(currentRow, currentCol, direction)){
            setTimeout(() => {
                // alert("NEXT IS OUT OF BOUND at " + direction)
                // set that direction false so basically you are not going to move there
                const newGrid = [...finalGrid];
                newGrid[currentRow][currentCol][direction] = false;
                newGrid[currentRow][currentCol]['color'] = 'white';
                updateFinalGrid(newGrid);
                
                currentNode[direction] = false;
                // Go to another direction THAT IS NOT FALSE
                const validDirection = chooseDirectionNotTravelled(currentNode,currentRow,currentCol);
                alert(direction + " is wall. New Dir is " + validDirection);
 
                traverse(currentRow,currentCol,validDirection);

            }, 1500);
        } else {
    
            // Move on to the next one because current is not end node
            setTimeout(() => {
    
                if(isNextNodeAWall(currentRow, currentCol,direction)){
                    // If the next node in the direction of the current node is a wall (color black)
                    // If it is a wall, then we can change direction
                    // alert("NEXT IS WALL at " + direction)
                    // set that direction false so basically you are not going to move there
                    
                    const newGrid = [...finalGrid];
                    newGrid[currentRow][currentCol][direction] = false;
                    newGrid[currentRow][currentCol]['color'] = 'white';
                    updateFinalGrid(newGrid);
                    
                    currentNode[direction] = false;
                    // Go to another direction THAT IS NOT FALSE
                    const validDirection = chooseDirectionNotTravelled(currentNode,currentRow,currentCol);
                    alert(direction + " is wall. New Dir is " + validDirection);
    
                    // YOU ARE GOING HERE SO U NEED TO MAKE SURE U CHECK OUT OF BOUND IN CHOOSE DIRECTION   
                    traverse(currentRow,currentCol,validDirection)
    
                } else {
            
                    // Next node is NOT a wall, we check the only valid moves 
                    let validDirection;

                    if(!currentNode[direction]){
                        // If false, we need to look for other valid directions
                        validDirection = chooseDirectionNotTravelled(currentNode,currentRow,currentCol);// if false we need to find another option
                        const newGrid = [...finalGrid];
                        newGrid[currentRow][currentCol][direction] = false;
                        newGrid[currentRow][currentCol]['color'] = 'white';
                        updateFinalGrid(newGrid);
                    } else {
                        validDirection = direction;
                        const newGrid = [...finalGrid];
                        newGrid[currentRow][currentCol][direction] = false;
                        newGrid[currentRow][currentCol]['color'] = 'white';
                        updateFinalGrid(newGrid);
                    }

                    // THINK ABOUT IT. WE ARE VERY CLOSE!

                    // HERHERHERHE < REMEMBER THAT WE NEED TO CHECK IF THIS DIRECTION IS FALSE FIRST BECAUSE
                    // THIS MIGHT RETURNING... like up up and down down and now up is false so only right or left
                 
                    
                    // and move to that direction
                    traverse(currentRow,currentCol,validDirection)
                }   
    
                
            }, 1500);
        }
     

    };

    function traverse(currentRow, currentCol, direction){
        switch(direction){
            case "right":
                DFS(currentRow, currentCol + 1, "right");
                break;
            case "left":
                DFS(currentRow, currentCol - 1, "left");
                break;
            case "up":
                DFS(currentRow - 1, currentCol, "up");
                break;
            case "down":
                DFS(currentRow + 1, currentCol, "down");
                break;
        }
    }

    function chooseDirectionNotTravelled(node, row, col){
        const directions = Object.keys(node).filter(key => {
            return key != 'color';
        });
   
        const validDirections = [];

        // THIS IS THE PROBLEM. EVEN WHEN IT IS FALSE, still push to list...

        for(let i = 0; i < directions.length; i++){
            // If the node["right"] is true, then we can travel there. Return 
            const direction = directions[i];
            if(node[direction] && !isNextNodeOutOfBound(row,col,direction)){
                validDirections.push(direction);
            }
        };
        console.log(validDirections);

        const randomizedDirection = Math.floor(Math.random() * validDirections.length);

        return validDirections[randomizedDirection];
    }

    // Meaning all four directions are false
    function isSurroundedByWall(node){
        const directions = Object.keys(node).filter(key => {
            return key != 'color';
        });

        for(let i = 0; i < directions.length; i++){
            // i is for direction (i.e: right, left, up, down)
            // If there is if returns true, that means there is at least ONE direction to travel, so it is NOT blocked by wall
            const direction = directions[i];
            if(node[direction]){
                return false;
            }
        }

        // Return true to say that this node is actually surrounded
        return true;
    };

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

    function isNextNodeOutOfBound(row, col,direction){
        // Whether the next row is actually out of bound
        // row and col is the current one so need to adjust

        switch(direction){
            case "right":
                return col + 1 == rowAndColumn.col ? true : false;
            case "left":
                return col - 1 < 0 ? true : false;
            case "up":
                return row - 1 < 0 ? true : false;
            case "down":
                return row + 1 == rowAndColumn.row ? true : false;
        };
    };

    function isNextNodeAWall(row, col,direction){
        let nextNode;
        let nextNodeColor;

        switch(direction){
            case "right":
                nextNode = finalGrid[row][col+1];
                nextNodeColor = nextNode.color;
                return nextNodeColor == 'black' ? true : false;
            case "left":
                nextNode = finalGrid[row][col - 1];
                nextNodeColor = nextNode.color;
                return nextNodeColor == 'black' ? true : false;
            case "up":
                nextNode = finalGrid[row - 1][col];
                nextNodeColor = nextNode.color;
                return nextNodeColor == 'black' ? true : false;
            case "down":
                nextNode = finalGrid[row + 1][col];
                nextNodeColor = nextNode.color;
                return nextNodeColor == 'black' ? true : false;
        }
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

        for (let row = 0; row < totalRow; row++) {
            const tempRow = [];
            const totalCol = rowAndColumn.col;
            for(let col = 0; col < totalCol; col++){
                const randomNumber = Math.floor(Math.random() * 5);
                if(row == totalRow - 1 && col == 0){
                    tempRow.push(start);
                } else if(row == 0 && col == totalCol - 1){
                    tempRow.push(end);
                } else {
                    randomNumber == 0 ? tempRow.push(wall) : tempRow.push({
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
                    Generate Grid
            </Button>
            </div>
            <div style={{ marginTop: "25px" }}>
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewGrid(false); DFS(rowAndColumn.row - 1, 0, "right") }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
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