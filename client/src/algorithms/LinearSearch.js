import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Node from "../components/Node";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function LinearSearch() {
    const givenArray = [14, 94, 8, 23, 88, 6, 55, 62, 40, 70, 39];
    const sortedArray = [...givenArray].sort(function (a, b) { return a - b });
    let target;

    const [arrayToRender, updateArray] = useState(givenArray);

    function renderArray() {
        return arrayToRender.map(item => {
            if (!isNaN(item)) {
                return <Node value={item} />
            } else {
                return <Node value={item.value} color={item.color} />
            }
        })
    };

    function startSearch(e) {
        // const givenArray = [14, 94, 8, 23, 88, 6, 55, 62, 40, 70, 39];
        // If confused, startSearch IS NOT changing the givenArray. It is similiar to creating another copy of givenArray and change that. 

        target = e.target.value;
        updateArray(givenArray);
        let i = 0;
        let temp;

        var timer = setInterval(() => {
            if(i == givenArray.length){
                clearInterval(timer);
                return;
            };

            if(givenArray[i] == target){
                temp = givenArray[i];
                givenArray[i] = {
                    value: temp,
                    color: "#4FE608",
                };
                let newArray = [...givenArray];
                updateArray(newArray);
                clearInterval(timer);
                return;
            } else {
                temp = givenArray[i];

                givenArray[i] = {
                    value: temp,
                    color: "#1198F6",
                };

                let newArray = [...givenArray];
                updateArray(newArray);
            };
            i++;
        },1000);
    }

    return (
        <div>
            <p style={{color: "#142850", fontSize: "3vw"}}>Linear Search</p>
            <TextField
                id="linear-search-input"
                select
                helperText="Choose the number you want to search"
                onChange={startSearch}
            >
                {sortedArray.map((number, index) => (
                    <MenuItem key={index} value={number}>
                        {number}
                    </MenuItem>
                ))}
            </TextField>
            <Grid item xs={12} style={{ textAlign: "center", marginTop:"20px" }}>
                {renderArray()}
            </Grid>
        </div>
    )
}