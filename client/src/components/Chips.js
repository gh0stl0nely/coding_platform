import React from 'react';

const styles = {
  chips: {
    padding: "10px 20px",
    borderRadius: "20px",
    backgroundColor: "#00909e",
    margin: "10px",
    color: "white"
  }
}

export default function Chips(props) {

  return (
    <div>
      <span style={styles.chips} onClick={props.handleFunction}>{props.name}</span>
    </div>
  );
}