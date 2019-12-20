import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { StoreContext } from '../../../utils/GlobalState';
import axios from 'axios';
import API from "../../../utils/API";
import { UPDATE_TIME, GRAB_USER_ROUTINE } from "../../../utils/actions";


function RescheduleModal(props) {

  const [state, dispatch] = useContext(StoreContext);
  console.log("reshed", state);
  //console.log("passdown", props.passdown);

  const [timeUpdate, setTimeUpdate] = useState({
    HR: "",
    MN: "",
    AMPM: ""
  });

  // useEffect(()=>{
  //   console.log(timeUpdate)
  // },[timeUpdate])

  function timeMeX(e) {
    e.preventDefault();
    timeUpdate.HR = e.target.value
    //console.log(timeUpdate);
    setTimeUpdate(timeUpdate);
    console.log(timeUpdate)
  }
  function timeMeY(e) {
    e.preventDefault();
    timeUpdate.MN = e.target.value;
    //console.log(timeUpdate);
    setTimeUpdate(timeUpdate);
    console.log(timeUpdate)
  }
  function timeMeZ(e) {
    e.preventDefault();
    //console.log(e.target);
    timeUpdate.AMPM = e.target.value;
    //console.log(timeUpdate);
    setTimeUpdate(timeUpdate);
    console.log(timeUpdate)
  }

  function updateTime(e) {
    e.preventDefault();
    let constructTime = "";
    let hrs = "";
    let medLogId = e.target.id;


    if (timeUpdate.AMPM === "PM") {
      hrs = parseInt(timeUpdate.HR) + 12;
      constructTime = hrs + ":" + timeUpdate.MN + ":00";
      console.log("newtime", constructTime);
      API.updateStatus(medLogId, {
        time: constructTime
      }).then(result => {
        console.log(result)
        // alert("time update ", result);
        // console.log(result);
        //dispatch ({type: UPDATE_TIME })
        getUserRoutine(state.user.id)
      })
    } else {
      constructTime = timeUpdate.HR + ":" + timeUpdate.MN + ":00";
      console.log(constructTime);
      API.updateStatus(medLogId, {
        time: constructTime
      }).then(result => {
        //alert("time update ", constructTime);
        console.log(result)
        //dispatch ({})
        getUserRoutine(state.user.id)
      })
    }

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

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-color" id="contained-modal-title-vcenter">
          Reschedule Time 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-color">What time would you like to reschedule?</h4>
        <div className="row">
          <div className="col-4">
            <select className="form-control" id="exampleFormControlSelect1" onChange={timeMeX} id={"HOUR"}>
              <option value="" disabled selected hidden>HOUR</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
          <div className="col-4">
            <select className="form-control" id="exampleFormControlSelect1" onChange={timeMeY} id={"MINUTES"}>
              <option value="" disabled selected hidden>MINUTE</option>
              <option>00</option>
              <option>15</option>
              <option>30</option>
              <option>45</option>
            </select>
          </div>
          <div className="col-4">
            <select className="form-control" id="exampleFormControlSelect1" onChange={timeMeZ} id={"AMPM"}>
              <option value="" disabled selected hidden>AM/PM</option>
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
          <br />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button className="button-blue" onClick={props.onHide, updateTime} id={props.passdown} >Reschedule </Button>
      </Modal.Footer>
    </Modal>
  );
}


function Reschedule(props) {
  const [modalShow, setModalShow] = React.useState(false);

  console.log("reschedule", props.transferdown);


  return (
    <ButtonToolbar>
      <Button className="mr-2 ml-2 complete1" id="button-blue" onClick={() => setModalShow(true)} >
        Reschedule 
      </Button>

      <RescheduleModal
        passdown={props.transferdown}
        details={props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

export default Reschedule;
