import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Node from "./Node";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export default function TwoCounter() {
    const palindromeArray = ['racecar', 'level', 'Kayak', 'radar', 'civIc', 'madam', 'laptop', 'communication', 'npcmpn', 'health'];
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [startNewSearch, updatestartNewSearch] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [arrayToRender, updateArray] = useState(['r', 'a', 'c', 'e', 'c', 'a', 'r']);

    function renderArray() {
        return arrayToRender.map(item => {
            if (typeof item === 'string') {
                return <Node value={item} />
            } else {
                return <Node value={item.value} color={item.color} />
            }
        })
    };

    function generateNewWord() {
        let index = Math.floor(Math.random() * 10);
        let newWord = palindromeArray[index];
        let generatedArray = newWord.split('');

        updateArray(generatedArray);
        setError(false);
        setSuccess(false);
        updatestartNewSearch(true);
    };

    function startSearch() {
        updatestartNewSearch(false);
        let targetIndex = arrayToRender.length - 1;

        updateSearchStatus(false);
        let i = 0;
        let temp;
        let temp2;

        var timer = setInterval(() => {
            if (i == Math.floor(arrayToRender.length / 2)) {
                clearInterval(timer);
                updateSearchStatus(true);
                setSuccess(true);
                return;
            };

            if (arrayToRender[i] == arrayToRender[targetIndex]) {
                temp = arrayToRender[i];
                temp2 = arrayToRender[targetIndex];

                arrayToRender[i] = {
                    value: temp,
                    color: "#4FE608",
                };

                arrayToRender[targetIndex] = {
                    value: temp2,
                    color: "#4FE608",
                }
                let newArray = [...arrayToRender];
                updateArray(newArray);
            } else {
                temp = arrayToRender[i];
                temp2 = arrayToRender[targetIndex];

                arrayToRender[i] = {
                    value: temp,
                    color: "#F35151",
                };

                arrayToRender[targetIndex] = {
                    value: temp2,
                    color: "#F35151",
                }

                let newArray = [...arrayToRender];
                updateArray(newArray);
                setError(true);
                updateSearchStatus(true);
                clearInterval(timer);
                return;
            };
            i++;
            targetIndex--;
        }, 1000);
    }

    return (
        <div>
            <p style={{ color: "#142850", fontSize: "3vw", fontFamily: 'Vidaloka' }}>Two Counter Algorithm</p>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
                {renderArray()}
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
                <Button id="gen-random-array-btn" onClick={generateNewWord} variant="contained" disabled={isFoundAnswer ? false : true} color="primary" style={{ margin: '10px' }}>
                    generate new word
                </Button>
                <Button id="gen-random-array-btn" onClick={startSearch} variant="contained" disabled={startNewSearch ? false : true} color="primary" style={{ margin: '10px' }}>
                    Start
                </Button>
                <div>
                    <Collapse in={success}>
                        <Alert
                            variant="filled"
                            style={{ width: '50%', margin: '10px auto' }}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setSuccess(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            It is a palindrome!
                    </Alert>
                    </Collapse>
                    <Collapse in={error}>
                        <Alert
                            variant="filled"
                            severity="error"
                            style={{ width: '50%', margin: '10px auto' }}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setError(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            This is not a palindrome!
                    </Alert>
                    </Collapse>
                </div>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>Time complexity: O(N)</p>
                <p style={{ fontWeight: "bold" }}>Space complexity: O(1)</p>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px", padding: '0px 40px' }}>
                <p style={{ fontWeight: "bold" }}>Explanation</p>
                <div style={{ textAlign: "justify" }}>
                    <p>This is the so-called "Optimal solution" for checking whether a word is a palindrome or not (i.e: racecar or dood). For those who don't know, a palindrome is a word that is the same forward and backward. * Our platform has this question! *</p>
                    <p>While it might seem intriguing to think that reversing a string and comparing the reversed version to the original one is a good solution, that approach would result in a O(N) space complexity, where N is the length of the original string. That is due to the fact that reversing a string, under the hood, will create another version of the original string backward, which will be stored in another variable of length N.</p>
                    <p>Using Two Counter algorithm, we are not using additional space to store anything, hence O(1) space complexity. As for time complexity of O(N), the algorithms only goes through the string only once with two counters (one from the start of the string and one from the end of the string) and checks whether there is a mismatch of letter at any point.</p>
                    <p>Note: the implementation of this visualization checks for strict equality, meaning uppercase and lowercase letter is not deemed equal (i.e: K is NOT equal to k)</p>
                </div>

            </Grid>
        </div>
    )
}