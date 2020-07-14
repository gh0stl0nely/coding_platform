import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';

export default function BubbleSort() {
    const [finalArray, updateFinalArray] = useState([generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray, updateIsGeneratedNewArray] = useState(false);
    const [chosenArrayLength, setChosenArrayLength] = useState(5);

    function bubbleSort() {
        updateSearchStatus(false);
        updateIsGeneratedNewArray(false);

        let swap = true;
        let i = 0;
        let j = 1;
        let tempI;
        let tempJ;
        let temp;

        // Start Bubble sort
        var timer = setInterval(() => {

            if (finalArray[i] > finalArray[j]) {
                temp = finalArray[i];
                finalArray[i] = finalArray[j];
                finalArray[j] = temp;
                swap = true;
            };

            visualize(finalArray, i, j);

            i++;
            j++;

            if (j == finalArray.length) {
                if (swap) {
                    i = 0;
                    j = 1;
                    swap = false;
                } else {
                    let sortedArray = [...finalArray];
                    updateFinalArray(sortedArray);
                    updateSearchStatus(true);
                    clearInterval(timer);
                    return;
                }
            }
        }, 1000);

    };

    function visualize(finalArray, i, j) {
        // Convert into object to visualize :)  
        let tempI = finalArray[i];
        finalArray[i] = {
            value: finalArray[i],
            color: "green"
        }

        let tempJ = finalArray[j];
        finalArray[j] = {
            value: finalArray[j],
            color: "green"
        }

        let updatedArray = [...finalArray];
        updateFinalArray(updatedArray); // To show color 

        // After visualizing, set back to regular number instead of object
        finalArray[i] = tempI;
        finalArray[j] = tempJ;
    }

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100);
    };

    function handleChoice(e) {
        const value = e.target.value;
        setChosenArrayLength(value);
    };

    function generateRandomArray() {
        let generatedArray = [];
        for (let i = 0; i < chosenArrayLength; i++) {
            const randomNumber = generateRandomNumber();
            generatedArray.push(randomNumber);
        };

        updateFinalArray(generatedArray);
        updateIsGeneratedNewArray(true);
    };

    function renderFinalArray() {
        return (
            finalArray.map(item => {
                if (!isNaN(item)) {
                    return <Node value={item} />
                } else {
                    return <Node value={item.value} color={item.color} />
                }
            })
        )
    };

    return (
        <div>
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Bubble Sort</p>
            <TextField
                id="array-length-selection"
                select
                onChange={handleChoice}
                defaultValue={5}
                disabled={isFoundAnswer ? false : true}
                helperText="Choose the length of array to bubble sort"
            >
                {[5, 6, 7, 8, 9, 10, 11, 12].map((number, index) => (
                    <MenuItem key={index} value={number}>
                        {number}
                    </MenuItem>
                ))}
            </TextField>
            <div style={{ marginTop: "25px" }}>
                <Button id="gen-random-array-btn" onClick={generateRandomArray} variant="contained" disabled={isFoundAnswer ? false : true} color="primary">
                    Generate Random Array
            </Button>
            </div>
            <div style={{ marginTop: "25px" }}>
                <Button id="start-bubble-sort-btn" onClick={bubbleSort} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                    Bubble Sort
            </Button>
            </div>
            <div style={{ paddingTop: "30px" }}>
                {renderFinalArray()}
            </div>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Time complexity: O(N<sup>2</sup>)</p>
                <p style={{ fontWeight: "bold" }}>Space complexity: O(1)</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>Bubble sort is the most basic sorting algorithm. Bubble sort uses simple brute force method to compare every single item with one another and swap positions until the array is sorted, meaning when no more swap occurs. Under bubble sort, the array will be traversed N<sup>2</sup> times asymptotically (we will have a section to explain Asymptotic Complexity), meaning each item within the array is being "touched on" N times, in the worst case.</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>For instance, an array of length 3 will require 9 comparisons (3<sup>3</sup>) and items are passed through 3 times each in the worst case (when the array is completed unsorted). Due to its relatively slow time complexity, Bubble Sort is rarely used in solving real life problems, but rather for educational purpose. No extra space is needed.</p>
            </Grid>
        </div>
    )
}