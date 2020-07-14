import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Node from "./Node";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function BinarySearch() {
  let initialArray = [-1, 0, 1, 22, 35, 39, 42, 45, 52, 58, 67, 69, 72, 77, 98, 105];
  const [arrayToRender, updateFinalArray] = useState(initialArray);
  // When first render, the answer is found
  const [isFoundAnswer, updateSearchStatus] = useState(true);

  // num represents the number to search for in the array
  function binarySearchAlgoritm(arr, num) {
    var left = 0;
    var right = arr.length - 1;
    let mid = Math.floor((left + right) / 2);

    var timer = setInterval(() => {
      if (left > right) {
        let newArray = [...arr];
        updateFinalArray(newArray);
        updateSearchStatus(true);
        clearInterval(timer)
        return false;
      }
      const curr = arr[mid];

      if (curr == num) {
        arr[mid] = {
          value: arr[mid],
          color: "green",
        };
        let newArray = [...arr];
        updateFinalArray(newArray);
        updateSearchStatus(true);
        clearInterval(timer);
        return true;
      } else if (curr < num) {
        // Go right, grey out left
        arr[mid] = {
          value: arr[mid],
          color: "red",
        };
        // Need to get the index from mid  til left
        greyOut(arr, left, mid - 1); // 
        left = mid + 1;

      } else {
        // Go left, grey out right
        arr[mid] = {
          value: arr[mid],
          color: "red",
        };

        greyOut(arr, mid + 1, right); // 
        right = mid - 1;
      };

      mid = Math.floor((left + right) / 2);

      let newArray = [...arr];
      updateFinalArray(newArray);

    }, 1000);
  }

  // Grey out the part of array that is not searched
  function greyOut(array, start, end) {
    while (start <= end) {
      const value = array[start];
      array[start] = {
        value: value,
        color: "grey"
      };

      start++;
    }
  }

  function handleChoice(e) {
    const choseNumber = e.target.value;
    updateSearchStatus(false);
    updateFinalArray(initialArray);
    binarySearchAlgoritm(initialArray, choseNumber);
  }

  function renderArray(finalArray) {
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
      <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Binary Search</p>
      <TextField
        id="binary-search-input"
        select
        onChange={handleChoice}
        disabled={isFoundAnswer ? false : true}
        helperText="Choose the number you want to search binarily"
      >
        {initialArray.map((number, index) => (
          <MenuItem key={index} value={number}>
            {number}
          </MenuItem>
        ))}
      </TextField>
      <div style={{ marginTop: "20px" }}>
        {renderArray(arrayToRender)}
      </div>
      <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ fontWeight: "bold" }}>Time complexity: O(Log(N))</p>
          <p style={{ fontWeight: "bold" }}>Space complexity: O(1)</p>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ fontWeight: "bold" }}>Explanation</p>
          <p style={{paddingLeft: "20px", paddingRight: "20px"}}>Binary Search is another searching technique, but faster compared to Linear Search. Think about a time when you use a dictionary, you are not going to "linearly" search for the word right? You would likely start at a page that you think where the word would be located at. 
          If the word is not found here, you either turn the page left or right depending on where it is located alphabetically. Repeat the steps until you reach the end. 
          </p>
          <p style={{paddingLeft: "20px", paddingRight: "20px"}}>
          Time complexity is a tricky one to analyze. It is denoted as O(Log(N)). One needs to understand what O(Log(N)) means first. Time complexity is computed by counting the number of steps it takes to finish an algorithm. In case of linear search of O(N), if N is 6, then O(6) means it takes 6 steps to find the item. Similar concept applies to binary search in which Log(N) represents the number of steps it takes to find an item. If N is 8, Log(8) is 3, meaning that it takes a total of 3 steps to find the value in an array of length 8. In addition, if you notice, as N doubles, only ONE additional step is needed to find the item (Log(8) = 3 and Log(16) = 4). This fact simply proves that an algoritm whose complexities is O(Log(N)) is considered much faster compared to the ones with time complexity of O(N), given the same N. No extra space needed. 
          </p>
      </Grid>
    </div>
  )
}