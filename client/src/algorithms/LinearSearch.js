import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
    arrayStyle: {
        height: "25px",
        width: "25px",
        padding: "5px",
        margin: "0px 5px",
        border: "2px black solid",
        fontSize: "15px"
    }
}

export default function LinearSearch() {
    const givenArray = [14, 8, 23, 6, 55, 72, 40];
    const target = 6;

    function renderArray() {
        return givenArray.map(i => {
            return (
                <span style={styles.arrayStyle}>{i}</span>
            )
        })
    };

    function renderTarget() {
        return (
            <span style={{ color: "green" }}>{target}</span>
        )
    }

    function startSearch() {
        const search = (givenArray.map(i => {
            if (i !== target) {
                return (
                    <span style={{ color: "red", border: "2px red solid" }}>{i}</span>
                )
            } else {
                renderTarget()
            }
        }))
        return search;
    }

    return (
        <div>
            <p>Linear Search</p>
            <p>Find <span style={styles.arrayStyle}>{target}</span></p>
            <Button variant="contained" color="primary" onClick={startSearch}>
                Start
            </Button>
            <Grid item xs={12} style={{ textAlign: "center" }}>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
            </Grid>
        </div>
    )
}