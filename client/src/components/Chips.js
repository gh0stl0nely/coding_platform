import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const styles={
    chips: {
        padding: "10px 5px",
        backgroundColor:"#00909e",
        margin: "10px"
    }
}

export default function Chips(props) {
  
    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };
  
    const handleClick = () => {
      console.info('You clicked the Chip.');
    };
  
    return (
      <div>
        <Chip
          label={props.name}
          clickable
          onClick={handleClick}
          color="primary"
          onDelete={handleDelete}
          deleteIcon={<DoneIcon />}
          style={styles.chips}
        />
      </div>
    );
  }