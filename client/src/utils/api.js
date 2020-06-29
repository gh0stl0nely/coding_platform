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
                return response;
            } catch(e){
                throw e;
            }
        } else {
            // Token doesn't exist
            return null;
        }
    },

    searchQuestionByID: async function(id){
        const question = await axios.post(`/api/question/${id}`);
        return question;
    }

}