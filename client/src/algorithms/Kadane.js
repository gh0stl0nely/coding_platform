import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';

export default function KadaneAlgorithm() {

    const [finalArray, updateFinalArray] = useState([generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray, updateIsGeneratedNewArray] = useState(false);
    const [chosenArrayLength, setChosenArrayLength] = useState(5);
    const [sum, setSum] = useState({
        currentSum: Number.NEGATIVE_INFINITY,
        globalSum: Number.NEGATIVE_INFINITY
    });

    function kadaneAlgorithm(currentIndex, targetArray, currentSum, globalSum, indicesOfCurrentSum, indicesOfGlobalSum) {
        // Start Kadane

        const timer = setTimeout(() => {
            // Ending condition
            if(currentIndex == chosenArrayLength){
                updateSearchStatus(true);
                clearTimeout(timer);
                return;
            };

            const currentNumber = targetArray[currentIndex];
            visualizeCurrentPosition(currentIndex, targetArray);
            // Check local sum

            setTimeout(() => {
                if(currentSum + currentNumber >= currentNumber){
                    alert("Current Sum is " + (currentSum + currentNumber) + ". Continue counting subarray");
                    indicesOfCurrentSum["end"] = currentIndex;
           
                } else {
                    alert("Current Sum is " + (currentNumber) + " . Start a new contiguous subarray at index " + currentIndex);
                    indicesOfCurrentSum["start"] = currentIndex;
                    indicesOfCurrentSum["end"] = currentIndex;
                }

                visualizeYellow(targetArray, indicesOfCurrentSum["start"], indicesOfCurrentSum["end"]);

                currentSum = maxBetweenTwoNumber(currentSum + currentNumber, currentNumber);
                setSum({
                    currentSum,
                    globalSum,
                });    

                // Check global sum
                setTimeout(() => {
                    if(globalSum < currentSum){
                        alert("Found a new global sum: " + currentSum);
                        indicesOfGlobalSum["start"] =  indicesOfCurrentSum["start"] ;
                        indicesOfGlobalSum["end"] =  indicesOfCurrentSum["end"] ;
                    } else {
                        alert("There is no new global sum. Continue to the next index.")
                    }

                    visualizeNewGlobalAndGreyOutOldOnes(targetArray, indicesOfGlobalSum["start"], indicesOfGlobalSum["end"]);
                               
                    globalSum = maxBetweenGlobalAndCurrent(globalSum, currentSum);
                    currentIndex++;
                    setSum({
                        currentSum,
                        globalSum,
                    });    
                     
                    setTimeout(() => {
                        kadaneAlgorithm(currentIndex, targetArray, currentSum, globalSum,indicesOfCurrentSum, indicesOfGlobalSum);
                    }, 1500);

                },1500);

            },1500);

        }, 1500)

    };

    function visualizeNewGlobalAndGreyOutOldOnes(targetArray, start, end){
        // Find old #00FA9A and grey 
        for(let i = 0; i < start; i++){
            const currentItem = targetArray[i];
            if(currentItem["color"] == "#00FA9A"){
                targetArray[i] = {
                    value: currentItem.value,
                    color: "grey"
                }
            }
        };

        // start -> end is new
        for(let j = start; j <= end; j++){
            const currentValue = targetArray[j].value;
            targetArray[j] = {
                value: currentValue,
                color: "#00FA9A"
            }
        };

        const newArray = [...targetArray];
        updateFinalArray(newArray);
    }

    function visualizeYellow(targetArray, start, end){
        // First greyout all the before start THAT IS NOT BLUE! 
        for(let i = start; i >= 0; i--){
            const currentItem = targetArray[i];
            const { value, color } = currentItem;
            if(color !== "#00FA9A"){
                targetArray[i] = {
                    value,
                    color: "grey"
                }
            }
        }

        // START -> END BECOMES YELLOW
        for(let j = start; j <= end; j++){
            const currentValue = (typeof targetArray[j] === "object") ? targetArray[j].value : targetArray[j];
            targetArray[j] = {
                value: currentValue,
                color: "yellow"
            }
        }

        const newArray = [...targetArray];
        updateFinalArray(newArray);
    }

    function visualizeCurrentPosition(index, targetArray){
        const currentValue = targetArray[index];

        targetArray[index] = {
            value: currentValue,
            color: "green"
        };

        const newArray = [...targetArray];
        updateFinalArray(newArray);
    }

    function maxBetweenTwoNumber(num1, num2){
        return num1 >= num2 ? num1 : num2;
    };

    function maxBetweenGlobalAndCurrent(num1, num2){
        return num1 > num2 ? num1 : num2;
    };

    function generateRandomNumber(isZero) {
        // Between 0 and 1 (inclusive) = If 0 which means we will render positive number
        return isZero ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * -100) ;
    };

    function handleChoice(e) {
        const value = e.target.value;
        setChosenArrayLength(value);
    };

    function generateRandomArray() {
        let generatedArray = [];
        for (let i = 0; i < chosenArrayLength; i++) {
            const isZero = Math.floor(Math.random() * 2) == 0 ? true : false;
            const randomNumber = generateRandomNumber(isZero);
            generatedArray.push(randomNumber);
        };

        updateFinalArray(generatedArray);
        updateIsGeneratedNewArray(true);
        setSum({
            currentSum: Number.NEGATIVE_INFINITY,
            globalSum: Number.NEGATIVE_INFINITY
        })
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
        );
    };

    return (
        <div>
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Kadane Algorithm</p>
            <p style={{ color: "#142850", fontSize: "2.2vw", fontFamily: 'Vidaloka' }}>Optimal Solution for "Maximum Contiguous Subarray" Problem</p>
            <TextField
                select
                onChange={handleChoice}
                defaultValue={5}
                disabled={isFoundAnswer ? false : true}
                helperText="Choose the length of random array"
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
                <Button id="start-bubble-sort-btn" onClick={() => { updateSearchStatus(false); updateIsGeneratedNewArray(false); kadaneAlgorithm(0, [...finalArray], Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, {start: 0, end: 0}, {start: 0, end: 0}) }} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                    Start Kadane Algorithm
                </Button>
            </div>
            <div style={{ marginTop: "30px" }}>
                {renderFinalArray()}
            </div>
            <div style={{ marginTop: "30px" }}>
                <div>Current Sum: <strong>{sum.currentSum}</strong></div>
                <div>Global Sum: <strong>{sum.globalSum}</strong></div>
                <div style={{marginTop: "20px"}}>* See explanation below as to why both sums start out to be {Number.NEGATIVE_INFINITY} *</div>
            </div>
            <Grid container direction="row" style={{marginTop: "20px"}}>
            <Grid item xs={5}>
                        <div style={{ height: "20px", width: "20px", backgroundColor: "green", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Current number</p>
                </Grid>
                <Grid item xs={5}>
                        <div style={{ height: "20px", width: "20px", backgroundColor: "grey", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Numbers that are not part of neither sums</p>
                </Grid>
                <Grid item xs={5}>
                        <div style={{ height: "20px", width: "20px", backgroundColor: "yellow", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Subarray with the highest Local Sum</p>
                </Grid>
                <Grid item xs={5}>
                        <div style={{ height: "20px", width: "20px", backgroundColor: "#00FA9A", borderRadius: "10%", display: "inline-block", position: "relative", top: "10px", right: "10px", float: "right" }}></div>
                </Grid>
                <Grid item xs={7}>
                    <p style={{ fontSize: "12px", float: "left" }}>Subarray with the highest Global Sum</p>
                </Grid>
            </Grid>
         
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Time complexity: O(N)</p>
                <p style={{ fontWeight: "bold" }}>Space complexity: O(1)</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>If you haven't heard of the "Max Subarray Sum" problem before, sign in to our platform and give it a try! That being said, Kadane Algorithm makes use of Dynamic Programming and it is the optimal solution for this particular problem. The algorithm works as follow:</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>1) Declare two variables: "Current Sum" and "Global Sum", whose values are both Negative Infinity. The reason for such assignment is to cover potential edge cases. For instance, if we set the current sum and global sum to Zero and the array contains entirely negative number like [-1,-3,-9], then the algorithm would return Zero as the answer, which is incorrect.</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>2) Start a for loop to iterate through the array</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>3a) At every index, * compare whether the "Current Sum" + number at the current index added together is larger than the number at the current index by itself * . Store the result of the comparison in the variable "Current Sum"</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>3b) Once we got the new "Current Sum", we compare that to the "Global Sum" and store the result of the comparison to the variable "Global Sum". </p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>4) Repeat 3a) and 3b) and return the "Global Sum" variable as the final result after the loop exits.</p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>So... Why does it work? We highly recommend walking through an example on your own with a pen and paper (or with our visualization above!). The key idea is that the algorithm keeps track of the ongoing local (or current) sum at every index. If that local sum plus the current number (or just the current number by itself), is larger than the global sum, that simply means we find a possible maximum subarray!   </p>
                <p style={{paddingLeft: "20px", paddingRight: "20px"}}>It is straight forward to see why Time Complexity and Space Complexity are as they are. For time complexity, you are simply iterating through the array only once to compute the current sum, compare it with the global sum and reassign if needs be. The algorithm only keeps track of an ongoing current sum and global sum, hence having space complexity of O(1). </p>
            </Grid>
        </div>
    )
}