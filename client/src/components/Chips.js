import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const styles = {
  chips: {
    padding: "10px 5px",
    backgroundColor: "#00909e",
    margin: "10px"
  }
}

export default function Chips(props) {

  return (
    <div>
      <Chip
        label={props.label}
        clickable
        onClick={props.handleFunction}
        icon={<DoneIcon />}
        color="primary"
        style={styles.chips}
      />
    </div>
  );
}