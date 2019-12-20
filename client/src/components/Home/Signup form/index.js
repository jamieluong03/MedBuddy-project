import React, { useContext, useRef } from "react";
import { StoreContext } from "../../../utils/GlobalState";
import ApiCalls from "../../../utils/API"
import { USER_SIGN_UP, GRAB_USER_ROUTINE, LOGGED_TO_TRUE } from "../../../utils/actions";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function SignupForm() {

    const [state, dispatch] = useContext(StoreContext);

    const firstName = useRef();
    const lastName = useRef();
    const userName = useRef();
    const password = useRef();
    const email = useRef();

    const usersignup = (event) => {
        event.preventDefault();
        // dispatch({ type: "usersignup" });
        //alert("button clicked");
        //alert(firstName.current.value + " " + lastName.current.value + " " + userName.current.value + " " + password.current.value + " " + email.current.value);
        var newUser = {
            firstname: firstName.current.value,
            lastname: lastName.current.value,
            username: userName.current.value,
            password: password.current.value,
            email: email.current.value,
        };

        // console.log(firstName.current.value + " " + lastName.current.value + " " + userName.current.value + " " + password.current.value + " " + email.current.value);
        ApiCalls.saveUser(newUser)
            .then(function (data) {
                console.log("new user's data", data);
                dispatch({ type: USER_SIGN_UP, newUser });
                // dispatch({ type: LOGGED_TO_TRUE })
                getUserRoutine(data.data.id)
                window.location.replace("/");
            }).catch(err => console.log(err));
    }

    function getUserRoutine(userid) {
        axios.get("/api/user/" + { userid } + "/medRoutine").then((response) => console.log(response))
    }

    //console.log("dispatch", state);

    return (
        // state.logged ? (<Redirect to='/dashboard' />) :
            <div>
                <h2 className="text-center mt-4 mb-3">Signup</h2>
                <form className="mx-auto col-lg-5 col-md-6 col-sm-11 mt-4">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="Your first name..." ref={firstName}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="exampleInputLastName1" placeholder="Your last name..." ref={lastName}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername1" placeholder="Your username..." ref={userName}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Your password..." ref={password}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Your email..." ref={email}></input>
                    </div>
                    <button type="submit" id="button-blue" className="btn text-light center" onClick={usersignup}>Sign Up</button>
                </form>
            </div>
    )
}

export default SignupForm;