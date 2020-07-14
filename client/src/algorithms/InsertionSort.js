import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';

export default function InsertionSort() {

    const [finalArray, updateFinalArray] = useState([generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray, updateIsGeneratedNewArray] = useState(false);
    const [chosenArrayLength, setChosenArrayLength] = useState(5);

    function insertionSort(current) {
        // Start Insertion sort
        const timer = setTimeout(() => {
            // Out of bound which mean it is sorted
            if (current == finalArray.length) {
                updateSearchStatus(true);
                const newArray = [...finalArray];
                updateFinalArray(newArray);
                clearInterval(timer);
                return;
            };

            // visualizeInitial current index here
            visualizeCurrentPosition(current);
            let prev = current - 1; // previous index

            // Wait one second before do all the comparison 
            // This is like another loop
            setTimeout(() => {
                if (finalArray[current] < finalArray[prev]) {
                    let subArrayIndex = 0;
                    const innerTimer = setInterval(() => {
                        visualizeSubArray(current, subArrayIndex);

                        if (finalArray[current] <= finalArray[subArrayIndex]) {
                            const currentValue = finalArray.splice(current, 1);
                            finalArray.splice(subArrayIndex, 0, currentValue);
                            current++;
                            clearInterval(innerTimer);
                            insertionSort(current);
                        }

                        subArrayIndex++;
                    }, 1000);
                } else {
                    current++;
                    insertionSort(current);
                }

            }, 1000);

        }, 1500);

    };

    function visualizeSubArray(current, subArrayIndex) {
        let currentValue = finalArray[current];
        let subArrayValue = finalArray[subArrayIndex];

        if (currentValue <= subArrayValue) {
            finalArray[current] = {
                value: currentValue,
                color: "green"
            };
            finalArray[subArrayIndex] = {
                value: subArrayValue,
                color: "green"
            };
        } else {
            finalArray[current] = {
                value: currentValue,
                color: "red"
            };
            finalArray[subArrayIndex] = {
                value: subArrayValue,
                color: "red"
            };
        }

        let newArray = [...finalArray];
        updateFinalArray(newArray);
        finalArray[current] = currentValue;
        finalArray[subArrayIndex] = subArrayValue;
    };

    function visualizeCurrentPosition(current) {
        let currentValue = finalArray[current];
        let prevValue = finalArray[current - 1];

        if (currentValue < prevValue) {
            finalArray[current] = {
                value: currentValue,
                color: "red"
            };
            finalArray[current - 1] = {
                value: prevValue,
                color: "red"
            };
        } else {
            finalArray[current] = {
                value: currentValue,
                color: "#00FA9A"
            };
            finalArray[current - 1] = {
                value: prevValue,
                color: "#00FA9A"
            };
        }

        let newArray = [...finalArray];
        updateFinalArray(newArray);
        finalArray[current] = currentValue;
        finalArray[current - 1] = prevValue;
    };

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
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Insertion Sort</p>
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
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewArray(false); insertionSort(1) }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                    Insertion Sort
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
                <p style={{ fontWeight: "bold" }}>Worst case time complexity: O(N<sup>2</sup>)</p>
                <p style={{ fontWeight: "bold" }}>Best case time complexity: O(N)</p>
                <p style={{ fontWeight: "bold" }}>Space complexity: O(1)</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>The last basic sorting algorithm - Insertion Sort. Insertion sort traverses the array, compares the current and previous item and if the current number is smaller than the previous, it would travese the array one more time to find the correct index to insert the current item into (thus explains the O(N<sup>2</sup>) time complexity).</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>Be mindful that, under the hood, because inserting into an array actually takes O(N) time complexity due to the need for index shift, we will be making used of swapping in order to emulate index shifting. Compared to bubble sort and selection sort, insertion sort can result in a O(N) time complexity only when the array is almost or already sorted (Best case). No extra space needed.</p>
            </Grid>
        </div>
    )
}