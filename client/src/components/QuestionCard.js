import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GradeIcon from '@material-ui/icons/Grade';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function QuestionCard(props) {
  const classes = useStyles();

  function renderTick(isSolved){
    return isSolved ? <CheckCircleIcon /> : "";
  }

  function renderStars(difficulty){
    return difficulty == "Easy" ? <div><GradeIcon /></div> : 
    (difficulty == "Medium" ? <div><GradeIcon /><GradeIcon /></div>: 
    <div><GradeIcon /><GradeIcon /><GradeIcon /></div>);
  }

  function goToQuestion(id){  
    // Can use a debouncer here. Also send an axios request to backend. If exists, then we can
    window.location.href = `/question/id/${id}`;
  }

  return (
    <Card style={{marginTop: "20px"}} className={classes.root}>
      <CardContent>
        <Typography style={{textAlign: "center"}} variant="h5" component="h2">
          {props.questionType}
        </Typography>
      </CardContent>
      <Divider />
      {props.data.map(item => {
        return (
          <>
          <CardContent style={{paddingBottom: "0px"}}>
            <Typography>
            <Link onClick={() => goToQuestion(item["_id"])} style={{cursor: "pointer"}}>{item.title} {renderTick(item.isSolved)}</Link>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {renderStars(item.difficulty)}
            </Typography>
          </CardContent> 
          <Divider />
        </>
        )
      })}
    </Card>
  );
}
