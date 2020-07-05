import axios from "axios";

export default {

    // This function is called whenever navigates to another page to check authentication
    // In UserContext 
    // Use the token stored in local storage, if token exists, sends it as a header to authorization endpoint
    // If token is invalid, we will return {msg: "User not found!", isAuthenticated: false}
    authenticateLogin : async function(){
        const token = localStorage.getItem("jwt");
        if(token){
            try {
                const user = await axios.get("/api/auth", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return user;
            } catch(e){
                throw e;
            }
        } else {
            // Token doesn't exist
            return null;
        }
    },

    updateAndGetLastQuestion: async function(userID,questionID){
        const questionToDisplay = await axios.post(`/api/question`, {userID,questionID});
        return questionToDisplay;
    },

    saveUserInput: async function(input){
        await axios.post("/api/question/save", input);
    },

    saveLastQuestionID: async function(username, lastQuestionID){
        await axios.post("/api/save/lastQuestion", {username, lastQuestionID});
    }

}