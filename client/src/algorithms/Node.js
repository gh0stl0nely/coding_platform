import React from 'react';

export default function Node(props){
    return(
        <span style={{marginLeft: "0.5vw", padding: "5px", border: "2px black solid", fontSize: "1.5vw", backgroundColor: props.color ? props.color : "white"}} >{props.value}</span>
    )
}