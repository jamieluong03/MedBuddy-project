import React, { useContext, useRef, Component, useEffect, useState } from "react";
import ApiCalls from "../../../utils/API";
import axios from "axios";
import { GRAB_USER_INFO, GRAB_USER_ROUTINE } from "../../../utils/actions";
import { StoreContext } from "../../../utils/GlobalState";
//import { push } from 'react-router-redux';
//import { Redirect } from "react-router-dom";
//import history from "../../../App"
//import Dashboard from "../../../pages/Dashboard";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
//import { hostname } from "os";
//import { NavLink } from "react-bootstrap";
//import { createRequireFromPath } from "module";
//import { browserHistory } from 'react-router';

function LoginForm() {

    const [state, dispatch] = useContext(StoreContext);
    const [loggedState, setLoggedState] = useState(false);

    console.log("current state", state);

    const username = useRef();
    const password = useRef();

    function loginClick(event) {
        event.preventDefault();
        var userData = {
            username: username.current.value,
            password: password.current.value
        };
        // if (!userData.email || !userData.password) {
        //     return
        // }
        loginUser(userData.username, userData.password);

    }

    function loginUser(username, password) {
        axios.post("/api/login", {
            username: username,
            password: password
        })
            .then(function (data) {
                //console.log("window replacement");
                //console.log("data from axios", data.data);
                let transferMe = data.data
                dispatch({ type: GRAB_USER_INFO, transferMe })
                //console.log("first", data.data)
                getUserRoutine(data.data.id);
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    function getUserRoutine(id) {
        // console.log(currentUser)
        axios.get("/api/user/" + id + "/medRoutine").then(function (usersRoutine) {
            console.log("user routine", usersRoutine.data);
            let transferMyRoutine = usersRoutine.data
            //dispatch({ type: GRAB_USER_ROUTINE, transferMyRoutine })
            
            
            if (usersRoutine.data !== null) {
                console.log("TRUE");
                setLoggedState(true);
                grabLog(usersRoutine.data);
            } else {
                setLoggedState(true);
            }
        })
    }

    function grabLog(routineid) {
        for (let i = 0; i < routineid.length; i++) {
            axios.get("/api/medRoutine/" + routineid[i].id + "/medLog").then(function (results) {
                console.log(results.data)
                routineid[i].medlog = results.data
                // console.log("myroutine", myroutine)
                if (i === routineid.length - 1) {
                    dispatch({ type: GRAB_USER_ROUTINE, payload: routineid })
                    console.log("loggedstate before", loggedState);
                    setLoggedState(true);
                }
            })
        }

    }

    // useEffect(() => {
    //     console.log("useeffect", loggedState);
    // }, [loggedState])

    return (
        loggedState ? (<Redirect to='/dashboard' />) :
        <div id="border" className="card float-right mr-4 ml-4 mt-4 mb-4 text-color">
            <div className="card-body">
                <form className="float-right mb-4">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your username..." ref={username}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Your password..." ref={password}></input>
                    </div>
                    <button type="submit" id="button-blue" className="btn btn-light text-light" onClick={loginClick} >Log In</button>
                </form>
            </div>
        </div>

    )
}

export default LoginForm;
