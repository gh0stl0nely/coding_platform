import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";

export default function SelectionSort() {
  const [finalArray, updateFinalArray] = useState([generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), generateRandomNumber()]);
  const [isFoundAnswer, updateSearchStatus] = useState(true);
  const [isGeneratedNewArray, updateIsGeneratedNewArray] = useState(false);
  const [chosenArrayLength, setChosenArrayLength] = useState(5);

  function selectionSort() {
    updateSearchStatus(false);
    updateIsGeneratedNewArray(false);
    let current = 0;
    let i = 1;
    let temp;
    let currentValue;
    let iValue;
    // Start Selection Sort
    var timer = setInterval(() => {

      if (current == finalArray.length - 1) {
        // Sorted
        let newArray = [...finalArray];
        updateFinalArray(newArray);
        updateSearchStatus(true);
        clearInterval(timer);
        return;
      }

      // You are going to increment current when it is length  
      // if current == length then we done 
      if (finalArray[current] > finalArray[i]) {
        temp = finalArray[current];
        finalArray[current] = finalArray[i];
        finalArray[i] = temp;
      }

      visualize(finalArray, current, i);

      i++;

      if (i == finalArray.length) {
        current++;
        i = current + 1;
      };

    }, 1000);

  };

  function visualize(finalArray, current, i) {

    let iValue = finalArray[i];
    finalArray[i] = {
      value: finalArray[i],
      color: "green"
    };

    let currentValue = finalArray[current];
    finalArray[current] = {
      value: finalArray[current],
      color: "green"
    };

    let newArray = [...finalArray];
    updateFinalArray(newArray);

    // Back to normal
    finalArray[i] = iValue;
    finalArray[current] = currentValue;
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
      <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Selection Sort</p>
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
        <Button id="start-bubble-sort-btn" onClick={selectionSort} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
          Selection Sort
            </Button>
      </div>
      <div style={{ marginTop: "30px" }}>
        {renderFinalArray()}
      </div>
      <div style={{ marginTop: "30px" }}>
        <p style={{ fontWeight: "bold" }}>Space complexity: </p>
        <p style={{ fontWeight: "bold" }}>Time complexity: </p>
      </div>
      <div style={{ marginTop: "30px" }}>
        <p style={{ fontWeight: "bold" }}>Explaination</p>
        <p>lalalalalalala</p>
      </div>
    </div>
  )
}