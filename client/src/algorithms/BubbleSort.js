import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";

export default function BubbleSort(){   
    const [finalArray, updateFinalArray] = useState([generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber()]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray , updateIsGeneratedNewArray] = useState(false);
    const [chosenArrayLength, setChosenArrayLength] = useState(5);

    function bubbleSort(){
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

            if(finalArray[i] > finalArray[j]){
                temp = finalArray[i];
                finalArray[i] = finalArray[j];
                finalArray[j] = temp;
                swap = true;
            };

            // Convert into object to visualize :)  
            tempI = finalArray[i];
            finalArray[i] = {
                value: finalArray[i],
                color: "green"
            }

            tempJ = finalArray[j];
            finalArray[j] = {
                value: tempJ,
                color: "green"
            }

            let updatedArray = [...finalArray];
            updateFinalArray(updatedArray); // To show color 
            
            // After visualizing, set back to regular number instead of object
            finalArray[i] = tempI;
            finalArray[j] = tempJ;

            i++;
            j++;

            if(j == finalArray.length){
                if(swap){
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
            <Button id="start-bubble-sort-btn" onClick={bubbleSort} variant="contained" disabled={isGeneratedNewArray ? false : true} color="secondary">
                Bubble Sort
            </Button>
          </div>
          <div style={{marginTop: "30px"}}>
            {renderFinalArray()}
          </div>
        </div>
    )
}