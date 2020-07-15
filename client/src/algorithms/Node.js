import React from 'react';

export default function Node(props) {
    if (props.isGridNode) {
        return (
            <div style={{ listStyle: 'none', height: '3vw', width: '3vw', border: '2px solid black', margin: '0.5vw', display: 'inline-block', backgroundColor: props.color ? props.color : "white" }}></div>
        )
    } else {
        return (
            <span style={{ marginLeft: "0.5vw", padding: "5px", border: "2px black solid", fontSize: "1.5vw", backgroundColor: props.color ? props.color : "white" }} >{props.value}</span>
        )
    }
}

