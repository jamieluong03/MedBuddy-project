import React from "react";
import NavBeforeLogin from "../components/Home/NavBar (public)/index"
import InfoCards from "../components/Home/Information cards/index";
import Jumbotron from "../components/Home/Jumbotron/index"

function Home() {
    return (
        <>
            <NavBeforeLogin />
            <Jumbotron /> 
            <div class="container">
               <InfoCards /> 
            </div>
            
        </>

    );
};

export default Home;

