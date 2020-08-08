import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Node from "./Node";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export default function TwoCounter() {
    const palindromeArray = ['racecar', 'happy', 'level', 'kayak', 'radar', 'civic', 'madam', 'refer', 'laptop', 'communication', 'environment', 'calculation'];
    const [isFoundAnswer, updateSearchStatus] = useState(true);
    const [isGeneratedNewWord, updateIsGeneratedNewWord] = useState(false);
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
        let index = Math.floor(Math.random() * 12);
        let newWord = palindromeArray[index];
        let generatedArray = newWord.split('');

        updateArray(generatedArray);
        updateIsGeneratedNewWord(true);
    };

    function startSearch() {
        setSuccess(false);
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
                <Button id="gen-random-array-btn" onClick={startSearch} variant="contained" disabled={isFoundAnswer ? false : true} color="primary" style={{ margin: '10px' }}>
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
                    <p>
                        This is an algorithm for solving the "Valid Palindrome Check" problem. If you haven't done it before, sign in to our platform and give it a try!<br></br>
                    Since a palindrome reads the same backward as forward, we can go through the word and check if the first letter is the same as the last letter, the second letter is the same as the second last letter, etc. This way we don't need to go through the whole word, instead, only half of it! If any letters don't match, then it is not a palindrome. After checking all the letters in the first half of the word match those of the last half, we can confirm that it is a palindrome.
                    </p>
                </div>

            </Grid>
        </div>
    )
}