import React, {useState, useEffect} from "react";
import Node from "../components/Node";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function BinarySearch(){
    let initialArray = [-1,0,1,22,29,35,39,42,45,52,58,67,69,72,77,98,105,120,210,390,400];
    const [arrayToRender, updateFinalArray] = useState(initialArray);
    // When first render, the answer is found
    const [isFoundAnswer, updateSearchStatus] = useState(true);

    // num represents the number to search for in the array
    function binarySearchAlgoritm(arr,num){     
      var left = 0;
      var right = arr.length - 1 ;
      let mid = Math.floor((left + right) / 2);
  
      while(left <= right){
          const curr = arr[mid];
          if(curr == num){
              arr[mid] = {
                value: arr[mid],
                isTarget: true,
              }
              let arrayToRender = [...arr];
              return arrayToRender;
          } else if(curr < num){
              // Go right
              arr[mid] = {
                value: arr[mid],
                isTarget: false,
              }
              left = mid + 1;
          } else {
              // Go left
              arr[mid] = {
                value: arr[mid],
                isTarget: false,
              };
              right = mid - 1;
          };
  
          mid = Math.floor((left + right) / 2);
      };

      let arrayToRender = [...arr];
      return arrayToRender;
    }

    function handleChoice(e){
      const choseNumber = e.target.value;
      updateSearchStatus(false);
      const finalArray = binarySearchAlgoritm(initialArray,choseNumber);
      updateFinalArray(finalArray);
      
      setTimeout(() => {
        updateSearchStatus(true);
      }, 2000);

    }

    function renderArray(finalArray){
      return (
        finalArray.map(item => {
          if(!isNaN(item)){
            return <Node value={item} />
          } else {
            return <Node value={item.value} isTarget={item.isTarget} />
          }
        })
      )

    };

    return (
        <div>
          <TextField
          id="binary-search-input"
          select
          // label="Select"
          onChange={handleChoice}
          disabled={isFoundAnswer ? false : true}
          helperText="Choose the number you want to search binarily"
          >
            {initialArray.map((number,index) => (
              <MenuItem key={index} value={number}>
                {number}
              </MenuItem>
            ))}
          </TextField>
          {renderArray(arrayToRender)}
        </div>
    )
}