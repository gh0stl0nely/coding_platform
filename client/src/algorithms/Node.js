import React from 'react';

export default function Node(props){
    return(
        <span style={{marginLeft: props.isGridNode ? "0" : "0.5vw", padding: props.isGridNode ? "10px" : "5px", paddingBottom: props.isGridNode ? "0" : "5px", border: "2px black solid", fontSize: "1.5vw", backgroundColor: props.color ? props.color : "white"}} >{props.value}</span>
    )
}

