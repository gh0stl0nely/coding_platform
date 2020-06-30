import React, {useState, useEffect} from 'react';
import API from "../utils/api";

const UserContext = React.createContext();

function UserContextProvider(props){

    const [loginStatus, setLoginStatus] = useState({
        isLoggedin: false,
        username: "",
        questions: [],
        lastQuestionID: ""
    });

 

    useEffect(() => {
        checkAuthentication();
    },[]);

    function logout(){
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    function goToQuestion(id){
        window.location.href = `/question/id/${id}`;
        localStorage.setItem("username", loginStatus.username);
    };

    async function checkAuthentication(){
        const user = await API.authenticateLogin();
        if(user && user.data.isAuthenticated){
            setLoginStatus({
                isLoggedin: true,
                username: user.data.username,
                questions: user.data.questions,
                lastQuestionID: user.data.lastQuestionID
            });
        } else {
            setLoginStatus({
                isLoggedin: false,
                username: "",
                questions: [],
                lastQuestionID: ""
            });
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