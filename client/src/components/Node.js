import React from 'react';

// const styles = {
//     arrayStyle: {
//         marginLeft: "20px",
//         padding: "10px",
//         border: "2px black solid",
//         fontSize: "30px"
//     }
// }

export default function Node(props){
    return(
        <span style={{marginLeft: "20px", padding: "10px", border: "2px black solid", fontSize: "30px", backgroundColor: props.isTarget ? "green" : props.isTarget == false ? "red" : "grey" }} >{props.value}</span>
    )
}