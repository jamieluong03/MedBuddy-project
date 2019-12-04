import React, { useContext, useState } from "react";
import NavAfterLogin from "../components/Nav (afterlogin)/index";
import Calendarbar from "../components/Dashboard/Calendarbar";
import Medstaken from "../components/Dashboard/Medstaken/index";
import Medsnottaken from "../components/Dashboard/Medsnottaken/index";
import { Row, Col } from 'react-bootstrap';
import { StoreContext } from './../utils/GlobalState'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


function Dashboard() {
    const [state, dispatch] = useContext(StoreContext);
    console.log("dashboard", state)
    

    return (
        // state.logged ? (
        <div>
            <NavAfterLogin />
            <div className="container">
                <Calendarbar></Calendarbar>
               
                <Row>
                    <Col lg={true} >
                    <h2 id="medsihavetotake" className="text-center mt-3 mb-3 text-color">Medications I have to take</h2>
                    <div id="medsnottaken">
                    {
                    state.medroutine.map(log =>
                        <Medsnottaken 
                        key={log.id}
                        name={log.medicinename}
                        dose={log.dose}
                        MedLogs={log.MedLogs}
                        status={false}
                        />                      
                    )}
                    </div>
                    </Col>

                    <Col lg={true} >
                    <h2 id="medsivetaken" className="text-center mt-3 mb-3 text-color">Medications I've taken</h2>
                    <div id="medstaken">
                    {state.medroutine.map(log =>
                        <Medsnottaken
                        key={log.id}
                        name={log.medicinename}
                        dose={log.dose}
                        MedLogs={log.MedLogs}
                        status={true}
                        />
                    )}
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        )
    //     : (<Redirect to = '/' />)
    // )
}

export default Dashboard;