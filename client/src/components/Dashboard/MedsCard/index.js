import React, { useContext } from "react";
import Reschedule from "../Reschedule modal/index";
import { Button } from "react-bootstrap";
import API from "../../../utils/API";
import { UPDATE_STATUS, UPDATE_ROUTINE, GRAB_USER_ROUTINE } from "../../../utils/actions";
import { StoreContext } from "../../../utils/GlobalState";
import { tsPropertySignature } from "@babel/types";
import axios from 'axios';

function MedsCard(props) {
  console.log("medscard", props.logId)
  const [state, dispatch] = useContext(StoreContext);

  const handleSubmit = e => {
    e.preventDefault();
    API.updateStatus(props.logId, {
      status: true
    }).then(result => {
      console.log("COMPLETE BUTTON", result)
      // dispatch({
      //     type: UPDATE_STATUS,
      //     medroutine: result
      getUserRoutine(state.user.id)
    });
    function getUserRoutine(id) {
      // console.log(currentUser)
      axios.get("/api/user/" + id + "/medRoutine").then(function (usersRoutine) {
        console.log("user routine", usersRoutine.data.length);
        //let transferMyRoutine = usersRoutine.data
        //dispatch({ type: GRAB_USER_ROUTINE, transferMyRoutine })
        grabLog(usersRoutine.data);

      })
    }
    function grabLog(routineid) {
      for (let i = 0; i < routineid.length; i++) {
        axios.get("/api/medRoutine/" + routineid[i].id + "/medLog").then(function (results) {
          console.log(results.data)
          routineid[i].medlog = results.data
          // console.log("myroutine", myroutine)
          console.log(state.logged)
          if (i === routineid.length - 1) {
            dispatch({ type: GRAB_USER_ROUTINE, payload: routineid })
          }
        })
      }
    }
    // API.getAllRoutines(state.user.id)
    // .then(results => {
    //     console.log("run me", results.data)
    //     let routines = results.data;
    //     console.log("hey! this is your updated routines", routines)
    //     // dispatch({ type: FIND_ALL_ROUTINES, payload: routines })
    //     dispatch({ type: UPDATE_ROUTINE, medroutine: routines })

    //     //console.log('CURRENT STATE', state)
    // }).then(() => {
    //     console.log("state after then then", state);
    // });
    // })
  };

  return (
    <div className="card mt-4 text-color">
      <div id="medsihavetotakecard" className="card-body">
        <h1 className="card-title text-center">{props.date}</h1>
        <h4 id="time" className="card-title text-center">{props.time}</h4>
        <h5 id="drugname" className="text-center">{props.name} </h5>
        <h5 id="drugcon" className="text-center">{props.dose}</h5>
        <div className="row justify-content-center">

          {!props.status ?
            <Button onClick={handleSubmit} className="mr-2 ml-2 complete1" id="button-blue" >Complete</Button>
            : <></>
          }
          {!props.status ?
            <Reschedule transferdown={props.logId} />
            : <></>
          }
        </div>
      </div>
    </div>

  )
}

export default MedsCard;