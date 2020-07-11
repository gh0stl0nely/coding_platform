import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GradeIcon from '@material-ui/icons/Grade';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import {UserContext} from "../context/UserAuthentication";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#35618F",
    marginTop: "20px",
    borderRadius: "20px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
    color: "white"
  },
});

export default function QuestionCard(props) {
  const classes = useStyles();
  const { goToQuestion } = useContext(UserContext);

  function renderTick(isSolved){
    return isSolved ? <CheckCircleIcon style={{position: "relative", top: "5px"}}/> : "";
  }

  function renderStars(difficulty){
    return difficulty == "Easy" ? <div><GradeIcon /></div> : 
    (difficulty == "Medium" ? <div><GradeIcon /><GradeIcon /></div>: 
    <div><GradeIcon /><GradeIcon /><GradeIcon /></div>);
  };

  function renderQuestionLink(item){
    if(item["_id"]){
      return (
        <Tooltip title={item.isSolved ? "I'm solved, yay!" : "Give me a try!"} TransitionComponent={Zoom} arrow>
          <Link onClick={() => goToQuestion(item["title"])} style={{cursor: "pointer", color: "white", fontSize: "18px"}}>{item.title} {renderTick(item.isSolved)}</Link>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title="Sign in to access me :)" TransitionComponent={Zoom} arrow>
          <Link onClick={() => window.location.href = "/signin"} style={{cursor: "not-allowed", color: "white", fontSize: "18px"}}>{item.title} {renderTick(item.isSolved)}</Link>
        </Tooltip>
      )
    }
  }

  return (
    <Box style={{borderRadius: "20px"}} boxShadow={10}>
      <Card className={classes.root}>
      <CardContent>
        <Typography style={{textAlign: "center", color: "white", fontWeight: "bold"}} variant="h5" component="h2">
          {props.questionType}
        </Typography>
      </CardContent>
      <Divider style={{backgroundColor: "white"}}/>
      {props.data.map(item => {
        return (
          <>
          <CardContent style={{paddingBottom: "0px"}}>
            <Typography>  
              {renderQuestionLink(item)}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {renderStars(item.difficulty)}
            </Typography>
          </CardContent> 
          <Divider style={{backgroundColor: "white"}}/>
        </>
        )
      })}
    </Card>
    </Box>
    
  );
}
