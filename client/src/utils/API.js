import axios from "axios";

export default {
    // API call to get top headlines for Health Page
    getNews: function () {
        return axios.get("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=4499ded633c940b7885aca83297927c8"); 
    },

    saveUser : function(newUser)
    {
        return axios.post("/api/user", newUser)
    },
    loginUser : function (loginDetails) //not yet applied
    {
        return axios.post("/api/user/login", loginDetails)
    }
};
