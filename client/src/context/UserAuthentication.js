import React, {useState, useEffect} from 'react';
import API from "../utils/auth";

const UserContext = React.createContext();

function UserContextProvider(props){

    const [loginStatus, setLoginStatus] = useState({
        isLoggedin: false,
        username: ""
    });

    async function checkAuthentication(){
        const user = await API.authenticateLogin();
        if(user && user.data.isAuthenticated){
            setLoginStatus({
                isLoggedin: true,
                username: user.data.username
            });
        } else {
            setLoginStatus({
                isLoggedin: false,
                username: ""
            });
        }
    }

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <UserContext.Provider value={loginStatus}>
            {props.children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
};