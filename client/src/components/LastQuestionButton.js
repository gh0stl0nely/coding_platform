import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import {UserContext} from "../context/UserAuthentication";

export default function LastQuestionButton(){
    const { loginStatus, goToQuestion } = useContext(UserContext);
    // alert(loginStatus.lastQuestionID);
    return (
        <>
            <Button onClick={() => goToQuestion(loginStatus.lastQuestionID)} style={{display: (loginStatus.isLoggedin && loginStatus.lastQuestionID !== "") ? "block" : "none"}} variant="contained">Continue your progress</Button>
        </>
    )
}
