import React from 'react';

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

    function renderArray() {
        return givenArray.map(i => {
            return (
                <span style={styles.arrayStyle}>{i}</span>
            )
        })
    };

    return (
        <div>
            <p>Linear Search</p>
            {renderArray()}
        </div>
    )
}