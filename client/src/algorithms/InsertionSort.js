import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Node from "./Node";
import Grid from '@material-ui/core/Grid';

export default function InsertionSort(){   

    const [finalArray, updateFinalArray] = useState([generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber()]);
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewArray , updateIsGeneratedNewArray] = useState(false);
    const [chosenArrayLength, setChosenArrayLength] = useState(5);

    function insertionSort(current){
        // Start Insertion sort
        const timer = setTimeout(() => {
            // Out of bound which mean it is sorted
            if(current == finalArray.length){
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
                if(finalArray[current] < finalArray[prev]){
                    let subArrayIndex = 0;
                    const innerTimer = setInterval(() => {
                        visualizeSubArray(current,subArrayIndex);

                        if(finalArray[current] <= finalArray[subArrayIndex]){
                            const currentValue = finalArray.splice(current,1);
                            finalArray.splice(subArrayIndex,0,currentValue);
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

    function visualizeSubArray(current,subArrayIndex){
        let currentValue = finalArray[current];
        let subArrayValue = finalArray[subArrayIndex];

        if(currentValue < subArrayValue){
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
          <Grid container direction="row" justify="center" alignItems="center" style={{marginTop: "20px", marginBottom: "-30px"}}>
            <div>
                <div style={{margin: "0 auto", height: "20px", width: "20px", backgroundColor: "#00FA9A", borderRadius: "10%"}}></div>
                <p style={{fontSize: "12px"}}>Correct order. Move to next number</p>
            </div>
            <div style={{marginLeft: "10px"}}>
                <div style={{margin: "0 auto", height: "20px", width: "20px", backgroundColor: "green", borderRadius: "10%"}}></div>
                <p style={{fontSize: "12px"}}>Found the correct spot to insert</p>
            </div>
          </Grid>
          <div style={{marginTop: "30px", textAlign: "center"}}>
              <div style={{height: "20px", width: "20px", backgroundColor: "red", borderRadius: "10%", margin: "0 auto"}}></div>
              <p style={{fontSize: "12px"}}>Wrong order, looking for the correct spot to insert</p>
          </div>
          
          <div style={{marginTop: "30px"}}>
            {renderFinalArray()}
          </div>
        </div>
    )
}