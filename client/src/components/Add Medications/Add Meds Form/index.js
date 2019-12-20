import React, { useState, useEffect, useRef } from "react";
import TimeDives from "../StartTimes/index";
import { useStoreContext } from "../../../utils/GlobalState";
import API from "../../../utils/API";
import { POST_ROUTINE, GRAB_USER_ROUTINE, FIND_ALL_ROUTINES, UPDATE_ROUTINE } from "../../../utils/actions";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import ToastMeds from "../Toast/index";

function MedicationForm() {
    const [userState, setUserState] = useState({
        selectValue: "1",
    });



    const medicinename = useRef();
    const dose = useRef();
    // i need this 
    const date = useRef();
    const datecount = useRef();
    // ---- //
    const dosage = useRef();

    const [state, dispatch] = useStoreContext();
    const [timeState, setTimeState] = useState({});


    console.log("initial " + userState.selectValue)
    let handleChange = (e) => {
        setUserState({ selectValue: e.target.value });
    }

    function handleSelect(data) {
        console.log("SELECTING...")
        setTimeState({ ...timeState, [data.key]: data.val })
        // function handleSelectMinute(e) {
        //     console.log("SELECTING...")
        //     console.log(e.target.value + "minutes")
        //     setTimeState({...timeState, [e.target.id]:e.target.value})
        // }
        // function handleSelectAMPM(e) {
        //     console.log("SELECTING...")
        //     console.log(e.target.value)
        // }
        //console.log(timeState)
    }

    useEffect(() => {
        console.log("TIMESTATE", timeState)

        // if(timeState.hour0)
        // {
        //     alert(" you have 1 log - insert save code here")
        // } else
        // if(timeState.hour1)
        // {
        //     alert(" you have 2 logs - insert save code here")
        // } else
        // if(timeState.hour2)
        // {
        //     alert(" you have 3 logs - insert save code here")
        // } else
        // if(timeState.hour3)
        // {
        //     alert(" you have 4 logs - insert save code here")
        // }


        // if (timeState.hour3) {
        //     console.log("useeffect you have 4 logs - insert save code here")
        // } else if (timeState.hour2) {
        //     console.log("useeffect you have 3 logs - insert save code here")
        // } else if (timeState.hour1) {
        //     console.log("useeffect you have 2 logs - insert save code here")
        // } else if (timeState.hour0) {
        //     console.log("useeffect you have 1 log - insert save code here")
        // }

    }, [timeState])

    const handleSubmit = (e, data) => {
        e.preventDefault();
        //console.log('DOSAGE', dosage.current.value)
        submitAPI();

    }

    const submitAPI = () => {

        API.postMedroutine(state.user.id, {

            dose: dose.current.value,
            date: date.current.value,
            datecount: datecount.current.value,
            dosage: dosage.current.value,
            UserId: state.user.id,
            medicinename: medicinename.current.value
        }).then(result => {
            console.log("POSTMEDROUTINE", result)
            dispatch({
                type: POST_ROUTINE,
                medroutine: result
            });
            // dispatch({ type: UPDATE_ROUTINE, medroutine : result})

            // function hrChange(hrConverted, AMPM) {
            //     //convert PM to military time
            //     if(AMPM === "PM")
            //     {
            //         hourcomputation0 = parseInt(hourcomputation0) + 12;
            //         time0 = hourcomputation0+":"+timeState.minute0+":"+"00";
            //         console.log("time pm", time0);

            //     } else if(AMPM === "AM")
            //     {
            //         time0 = hourcomputation0+":"+timeState.minute0+":"+"00";
            //         console.log("time am", time0);
            //     }
            // }


            if (timeState.hour3) {
                console.log("you have 4 logs - insert save code here")

                let hourcomputation0 = timeState.hour0;
                let time0 = "";

                if (timeState.ampm0 === "PM") {
                    hourcomputation0 = parseInt(hourcomputation0) + 12;
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time pm", time0);

                } else if (timeState.ampm0 === "AM") {
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time am", time0);
                }
                let myloop = datecount.current.value;
                let deconstructMyDateYEAR = date.current.value.slice(0, 4);
                let deconstructMyDateMONTH = date.current.value.slice(5, 7);
                let deconstructMyDateDAY = date.current.value.slice(8, 11);
                let baseday = parseInt(deconstructMyDateDAY);

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time0,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 0 SAVED!!!!"))
                }
                // ---------------------------------------------------- //

                let hourcomputation1 = timeState.hour1;
                let time1 = "";

                if (timeState.ampm1 === "PM") {
                    hourcomputation1 = parseInt(hourcomputation1) + 12;
                    time1 = hourcomputation1 + ":" + timeState.minute1 + ":" + "00";
                    console.log("time pm", time1);

                } else if (timeState.ampm1 === "AM") {
                    time1 = hourcomputation1 + ":" + timeState.minute1 + ":" + "00";
                    console.log("time am", time1);
                }
                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time1,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 1 SAVED!!!!"))
                }
                // ---------------------------------------------------- //

                let hourcomputation2 = timeState.hour2;
                let time2 = "";

                if (timeState.ampm2 === "PM") {
                    hourcomputation2 = parseInt(hourcomputation2) + 12;
                    time2 = hourcomputation2 + ":" + timeState.minute2 + ":" + "00";
                    console.log("time pm", time2);

                } else if (timeState.ampm2 === "AM") {
                    time2 = hourcomputation2 + ":" + timeState.minute2 + ":" + "00";
                    console.log("time am", time2);
                }
                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time2,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 2 SAVED!!!!"))
                }
                // ---------------------------------------------------- //

                let hourcomputation3 = timeState.hour3;
                let time3 = "";

                if (timeState.ampm3 === "PM") {
                    hourcomputation3 = parseInt(hourcomputation3) + 12;
                    time3 = hourcomputation3 + ":" + timeState.minute3 + ":" + "00";
                    console.log("time pm", time3);

                } else if (timeState.ampm3 === "AM") {
                    time3 = hourcomputation3 + ":" + timeState.minute3 + ":" + "00";
                    console.log("time am", time3);
                }
                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time3,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 3 SAVED!!!!"))
                }
            } else if (timeState.hour2) {
                console.log("you have 3 logs - insert save code here")

                let hourcomputation0 = timeState.hour0;
                let time0 = "";

                if (timeState.ampm0 === "PM") {
                    hourcomputation0 = parseInt(hourcomputation0) + 12;
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time pm", time0);

                } else if (timeState.ampm0 === "AM") {
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time am", time0);
                }
                let myloop = datecount.current.value;
                let deconstructMyDateYEAR = date.current.value.slice(0, 4);
                let deconstructMyDateMONTH = date.current.value.slice(5, 7);
                let deconstructMyDateDAY = date.current.value.slice(8, 11);
                let baseday = parseInt(deconstructMyDateDAY);

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time0,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 0 SAVED!!!!"))
                }
                // ---------------------------------------------------- //

                let hourcomputation1 = timeState.hour1;
                let time1 = "";

                if (timeState.ampm1 === "PM") {
                    hourcomputation1 = parseInt(hourcomputation1) + 12;
                    time1 = hourcomputation1 + ":" + timeState.minute1 + ":" + "00";
                    console.log("time pm", time1);

                } else if (timeState.ampm1 === "AM") {
                    time1 = hourcomputation1 + ":" + timeState.minute1 + ":" + "00";
                    console.log("time am", time1);
                }

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time1,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 1 SAVED!!!!"))
                }
                // ---------------------------------------------------- //

                let hourcomputation2 = timeState.hour2;
                let time2 = "";

                if (timeState.ampm2 === "PM") {
                    hourcomputation2 = parseInt(hourcomputation2) + 12;
                    time2 = hourcomputation2 + ":" + timeState.minute2 + ":" + "00";
                    console.log("time pm", time2);

                } else if (timeState.ampm2 === "AM") {
                    time2 = hourcomputation2 + ":" + timeState.minute2 + ":" + "00";
                    console.log("time am", time2);
                }

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time2,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 2 SAVED!!!!"))
                }
            } else if (timeState.hour1) {

                console.log("you have 2 logs - insert save code here")
                let hourcomputation0 = timeState.hour0;
                let time0 = "";

                if (timeState.ampm0 === "PM") {
                    hourcomputation0 = parseInt(hourcomputation0) + 12;
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time pm", time0);

                } else if (timeState.ampm0 === "AM") {
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time am", time0);
                }

                let myloop = datecount.current.value;
                let deconstructMyDateYEAR = date.current.value.slice(0, 4);
                let deconstructMyDateMONTH = date.current.value.slice(5, 7);
                let deconstructMyDateDAY = date.current.value.slice(8, 11);
                let baseday = parseInt(deconstructMyDateDAY);

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time0,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 0 SAVED!!!!"))
                }
                // ---------------------------------------------------- //

                let hourcomputation1 = timeState.hour1;
                let time1 = "";

                if (timeState.ampm1 === "PM") {
                    hourcomputation1 = parseInt(hourcomputation1) + 12;
                    time1 = hourcomputation1 + ":" + timeState.minute1 + ":" + "00";
                    console.log("time pm", time1);

                } else if (timeState.ampm1 === "AM") {
                    time1 = hourcomputation1 + ":" + timeState.minute1 + ":" + "00";
                    console.log("time am", time1);
                }

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    API.postMedlog(result.data.id,
                        {
                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time1,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 1 SAVED!!!!"))
                }

            } else if (timeState.hour0) {
                console.log("you have 1 log - insert save code here")
                let hourcomputation0 = timeState.hour0;
                let time0 = "";

                if (timeState.ampm0 === "PM") {
                    hourcomputation0 = parseInt(hourcomputation0) + 12;
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time pm", time0);

                } else if (timeState.ampm0 === "AM") {
                    time0 = hourcomputation0 + ":" + timeState.minute0 + ":" + "00";
                    console.log("time am", time0);
                }

                let myloop = datecount.current.value;
                let deconstructMyDateYEAR = date.current.value.slice(0, 4);
                let deconstructMyDateMONTH = date.current.value.slice(5, 7);
                let deconstructMyDateDAY = date.current.value.slice(8, 11);
                let baseday = parseInt(deconstructMyDateDAY);

                for (let i = 0; i < myloop; i++) {
                    let daytobesave = baseday + i
                    // let parseDay = parseInt(deconstructMyDateDAY);
                    // let mydate = deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + parseDay +1 ;
                    API.postMedlog(result.data.id,
                        {

                            //need to figure out how to rearrange the date format
                            date: deconstructMyDateYEAR + "/" + deconstructMyDateMONTH + "/" + daytobesave,
                            time: time0,
                            status: false
                        }).then(console.log("BOOM!!!! LOG 0 SAVED!!!!"))
                }
            }

            API.getAllRoutines(state.user.id)
                .then(results => {
                    console.log("run me", results.data)
                    let routines = results.data;
                    console.log("hey! this is your updated routines", routines)
                    // dispatch({ type: FIND_ALL_ROUTINES, payload: routines })
                    dispatch({ type: UPDATE_ROUTINE, medroutine: routines })

                    //console.log('CURRENT STATE', state)
                }).then(() => {
                    console.log("state after then then", state);
                });
        })
            .catch(err => console.log(err));

    }


    return (
        <form>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Medication Name</label>
                <input type="text" className="form-control" required ref={medicinename} placeholder="Add the name of your medication..." />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Dose</label>
                <input type="text" className="form-control" required ref={dose} placeholder="1 tablet..." />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">When should you start to take it?</label>
                <input type="text" className="form-control" required ref={date} placeholder="YYYY/MM/DD" />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">How many consecutive days do you need to take it?</label>
                <input type="text" className="form-control" required ref={datecount} placeholder="10" />
            </div>

            {/* <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">How often should you take it?</label>
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>everyday</option>
                    <option>every other day</option>
                </select>
            </div> */}

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">How many times a day do you need to take it?</label>
                <select
                    value={userState.selectValue}
                    onChange={handleChange}
                    className="form-control" ref={dosage} id="timesaday">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">What time do you want to start taking it?</label>

                <TimeDives handleSelect={handleSelect} selectValue={userState.selectValue} />
                {console.log("secondory ", userState.selectValue)}

            </div>
            <Button id="addmed" className= "form-control" onClick={handleSubmit}> <ToastMeds  >Add Medication </ToastMeds></Button>
        </ form >

        // <Form>
        //     <Form.Group controlId="exampleForm.ControlInput1">"
        //         <Form.Label>Medication Name</Form.Label>
        //         <Form.Control type="text" required ref={medicinename} placeholder="Add the name of your medication..." />
        //     </Form.Group>
        //     <Form.Group>
        //         <Form.Label>Dose</Form.Label>
        //         <Form.Control type="text" required ref={dose} placeholder="1 tablet..." />
        //     </Form.Group>
        //     <Form.Group>
        //         <Form.Label>When should you start to take it?</Form.Label>
        //         <Form.Control type="text" required ref={date} placeholder="YYYY/MM/DD" />
        //     </Form.Group>
        //     <Form.Group>
        //         <Form.Label>How many consecutive days do you need to take it?</Form.Label>
        //         <Form.Control type="text" required ref={datecount} placeholder="10" />
        //     </Form.Group>
        //     {/* <div className="form-group">
        //         <label htmlFor="exampleFormControlSelect1">How often should you take it?</label>
        //         <select className="form-control" id="exampleFormControlSelect1">
        //             <option>everyday</option>
        //             <option>every other day</option>
        //         </select>
        //     </div> */}
        //     <Form.Group>
        //         <Form.Label>How many times a day do you need to take it?</Form.Label>
        //         <Form.Control as="select"
        //             value={userState.selectValue}
        //             onChange={handleChange}
        //             className="form-control" ref={dosage} id="timesaday">
        //             <option value="1">1</option>
        //             <option value="2">2</option>
        //             <option value="3">3</option>
        //             <option value="4">4</option>
        //         </Form.Control>
        //     </Form.Group>
        //     <Form.Group>
        //         <Form.Label>What time do you want to start taking it?</Form.Label>
        //         <TimeDives handleSelect={handleSelect} selectValue={userState.selectValue} />
        //         {console.log("secondory ", userState.selectValue)}
        //     </Form.Group>
        //     <Button Click={handleSubmit}> <ToastMeds>Add Medication </ToastMeds></Button>
        // </Form>


    )
}



export default MedicationForm;