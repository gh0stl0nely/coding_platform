import React from 'react';

const styles = {
    arrayStyle: {
        marginLeft: "20px",
        padding: "10px",
        border: "2px black solid",
        fontSize: "30px"
    }
}

export default function Node(){
    return(
        <span style={styles.arrayStyle}>150</span>
    )
}