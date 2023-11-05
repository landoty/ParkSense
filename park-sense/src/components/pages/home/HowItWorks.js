import React from "react";
import HIWImage from './../../../img/home-img/microcontroller.png'
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function HowItWorks()
{
    return(
        <div>
        <style>
        {`
            .HIWLogo {
                float: left;
                margin-left: 30px;
                margin-right: 30px;
                width: 500px;
            }
            
            .HIWHeader {
                text-align: center;
            }

            .HIWRightMargin {
                margin-right: 30px;
            }
            
            .HIWpsize {
                font-size: 22px;
            }
        `}
        </style>
        <h1 className="HIWHeader">How does it work?</h1>
        <p className="HIWpsize HIWRightMargin">
        <img src={HIWImage} className="HIWLogo"></img>
        In order to track the capacities of each lot, cameras are set up at the entrances and exits of each parking lot. These cameras are connected to microcontrollers, where the combination of these two sense when a car enters a lot and when a car leaves a lot. When a car enters a lot, the capacity increases by one, and when a car leaves a lot, the capacity decreases by one. On the microcontroller, there is a machine learning model that detects if the object passing the camera is a car or not. This prevents non-car objects, such as people and bicycles, counting towards lot capacities. This data on the microcontroller is then passed to our web application using a REST API. The capacity information is frequently fetched from the microcontroller and automatically updated onto the website.</p>
        </div>
    );
}