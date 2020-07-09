import React, {useState} from "react";
import Node from "./Node";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function BinarySearch() {
  let initialArray = [-1, 0, 1, 22 , 35, 39, 42, 45, 52, 58, 67, 69, 72, 77, 98, 105];
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
      <p style={{color: "#142850", fontSize: "3vw"}}>Binary Search</p>
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
      <div style={{ marginTop: "30px" }}>
      <p>Description</p>
      </div>
    </div>
  )
}