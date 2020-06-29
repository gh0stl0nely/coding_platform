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

    function logout(){
        localStorage.removeItem("jwt");
        window.location.href = "/";
    }

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

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <UserContext.Provider value={{loginStatus, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
};