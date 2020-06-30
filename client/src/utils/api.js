import axios from "axios";

export default {
    authenticateLogin : async function(){
        const token = localStorage.getItem("jwt");
        if(token){
            try {
                const response = await axios.get("/api/auth", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // console.log(response);
                return response;
            } catch(e){
                throw e;
            }
        } else {
            // Token doesn't exist
            return null;
        }
    },

    updateAndGetLastQuestion: async function(username,id){
        const question = await axios.post(`/api/question`, {username,id});
        return question;
    },

    saveUserInput: async function(input){
        await axios.post("/api/save", input);
    },

    saveLastQuestionID: async function(username, lastQuestionID){
        await axios.post("/api/save/lastQuestion", {username, lastQuestionID});
    }

}