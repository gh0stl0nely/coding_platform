import React from 'react';

const styles = {
  chips: {
    padding: "10px 20px",
    borderRadius: "20px",
    backgroundColor: "#00909e",
    color: "white",
    cursor: 'pointer'
  }
}

export default function Chips(props) {

  return (
    <div style={{margin: '15px'}}>
      <span style={styles.chips} onClick={props.handleFunction}>{props.name}</span>
    </div>
  );
}