import React from 'react';

export default function Node(props) {
    if (props.isGridNode) {
        return (
            <div style={{ listStyle: 'none', height: '28px', width: '28px', border: '2px solid black', margin: '5px', display: 'inline-block' }}></div>
        )
    } else {
        return (
            <span style={{ marginLeft: props.isGridNode ? "0" : "0.5vw", padding: props.isGridNode ? "10px" : "5px", border: "2px black solid", fontSize: "1.5vw", backgroundColor: props.color ? props.color : "white" }} >{props.value}</span>
        )
    }
}

