import React from "react";

function InfoCards() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div id="border" className="height card text-color float-left mr-4 ml-4  mb-4">
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">Track your medications</h5>
                            <p className="card-text">MedBuddy provides you with a user-friendly weekly calendar system that allows you to input when you need to take your medications.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div id="border" className="height card text-color float-right mr-4 ml-4 mb-4">
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">View your medical history</h5>
                            <p className="card-text">MedBuddy keeps track of all the medications you have taken in a comprehensive data table that you can reference at any time.</p>
                        </div>
                    </div>

                </div>

            </div>


         </div>
            )
        }
        
export default InfoCards;