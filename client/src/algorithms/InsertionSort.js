import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";

export default function InsertionSort(){   
    const [finalArray, updateFinalArray] = useState([generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber()]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray , updateIsGeneratedNewArray] = useState(false);
    const [chosenArrayLength, setChosenArrayLength] = useState(5);

    function insertionSort(current){
        // Start Insertion sort
        setTimeout(() => {
            // Out of bound which mean it is sorted
            if(current == finalArray.length){
                updateSearchStatus(true);
                const newArray = [...finalArray];
                updateFinalArray(newArray);
                return;
            };

            // visualizeInitial current index here
            visualizeCurrentPosition(current);
            let prev = current - 1; // previous index
            setTimeout(() => {
                if(finalArray[current] < finalArray[prev]){
                    if(finalArray[current] < finalArray[prev]){
                        for(let j = 0; j < current; j++){
                            if(finalArray[current] <= finalArray[j]){
                                const currentValue = finalArray.splice(current,1);
                                finalArray.splice(j,0,currentValue);
                                break;
                            }
                        };
                    };
                };

            }, 1000);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

        }, 1500);

    };

    function visualize(){

    };
    
    function visualizeCurrentPosition(current){
        let currentValue = finalArray[current];
        let prevValue = finalArray[current - 1];

        if(currentValue < prevValue){
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
                color: "green"
            };
            finalArray[current - 1] = {
                value: prevValue,
                color: "green"
            };
        }

        let newArray = [...finalArray];
        updateFinalArray(newArray);
        finalArray[current] = currentValue;
        finalArray[current - 1] = prevValue;
        console.log(finalArray[current]);
        console.log(finalArray);
    };

    function visualizeFirstAndCurrentPosition(current){

    }

    function generateRandomNumber(){
        return Math.floor(Math.random() * 100);
    };

    function handleChoice(e){
        const value = e.target.value;
        setChosenArrayLength(value);
    };

    function generateRandomArray(){
        let generatedArray = [];
        for(let i = 0; i < chosenArrayLength; i++){
            const randomNumber = generateRandomNumber();
            generatedArray.push(randomNumber);
        };

        updateFinalArray(generatedArray);
        updateIsGeneratedNewArray(true);
    };

    function renderFinalArray(){
        return (
            finalArray.map(item => {
                if(!isNaN(item)){
                    return <Node value={item}/>
                } else {
                    return <Node value={item.value} color={item.color}/>
                }
            })
        )
    };
    
    return (
        <div>
            <TextField
          id="array-length-selection"
          select
          onChange={handleChoice}
          defaultValue={5}
          disabled={isFoundAnswer ? false : true}
          helperText="Choose the length of array to bubble sort"
          >
            {[5,6,7,8,9,10,11,12].map((number,index) => (
              <MenuItem key={index} value={number}>
                {number}
              </MenuItem>
            ))}
          </TextField>
          <div style={{marginTop: "25px"}}>
            <Button id="gen-random-array-btn" onClick={generateRandomArray} variant="contained" disabled={isFoundAnswer ? false : true} color="primary">
                Generate Random Array
            </Button>
          </div>
          <div style={{marginTop: "25px"}}>
            <Button id="start-bubble-sort-btn" onClick={() =>  {updateSearchStatus(false); updateIsGeneratedNewArray(false); insertionSort(1)}} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                Insertion Sort
            </Button>
          </div>
          <div style={{marginTop: "30px"}}>
            {renderFinalArray()}
          </div>
        </div>
    )
}