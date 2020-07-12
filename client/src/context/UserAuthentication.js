import React, {useState, useEffect} from 'react';
import API from "../utils/api";

const UserContext = React.createContext();

function UserContextProvider(props){
    const [loginStatus, setLoginStatus] = useState({
        isLoggedin: false,
        username: "",
        questions: [],
        lastQuestionTitle: ""
    });

    useEffect(() => {
        checkAuthentication();
    },[]);

    function logout(){
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    function goToQuestion(questionTitle){
        window.location.href = `/question/${questionTitle}`;
    };

    async function checkAuthentication(){
        const user = await API.authenticateLogin();
        if(user && user.data.isAuthenticated){
            setLoginStatus({
                uid: user.data.uid,
                isLoggedin: true,
                username: user.data.username,
                questions: user.data.questions,
                lastQuestionTitle: user.data.lastQuestionTitle
            });

        } else {
            setLoginStatus({
                isLoggedin: false,
                username: "",
                questions: [],
                lastQuestionTitle: ""
            });

            // Since we deleted jwt and username. Just make sure that when the hacker
            // Clicks on any question, 
           
            // This is a sign that someone tempers with the web token, we need to remove username and jwt right away
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
        }
    }
    return (
        <UserContext.Provider value={{loginStatus, logout, goToQuestion}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
};