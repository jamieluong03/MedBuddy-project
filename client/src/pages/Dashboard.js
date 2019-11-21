import React from "react";
import NavAfterLogin from "../components/Nav (afterlogin)/index";
import Calendarbar from "../components/Dashboard/Calendarbar";
import Medstaken from "../components/Dashboard/Medstaken/index";
import Medsnottaken from "../components/Dashboard/Medsnottaken/index";


function Dashboard({}) {
    return (
        <Container fluid>
        <NavAfterLogin></NavAfterLogin>
        <Calendarbar></Calendarbar>
        <Medstaken></Medstaken>
        <Medsnottaken></Medsnottaken>
    </Container>
    )
}

export default Dashboard;