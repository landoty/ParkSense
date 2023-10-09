/*
Name: WhatIsParkSense.js
Description:  About-us description page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/04/23
*/
import React from 'react';
import logo1 from './../../../img/parksense-logo.png'
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function WhatIsParkSense()
{
    return(
        <div>
        <style>
        {`
            .WIPSLogo {
                float: right;
                margin-left: 100px;
                margin-right: 30px;
                width: 500px;
            }
            
            .WIPSLeftMargin {
                margin-left: 30px;
            }
            
            .WIPSpsize {
                font-size: 22px;
            }
        `}
        </style>
        <h1 className="WIPSLeftMargin">What is ParkSense?</h1>
        <p className="WIPSpsize WIPSLeftMargin">
        <img src={logo1} className="WIPSLogo"></img>
        ParkSense is an online application that tracks the real-time capacity of parking lots for schools and companies. In order to track the capacities, cameras are set up at the entrances and exits of each parking lot, sensing when vehicles enter and leave the parking lots. Under the “Availability” tab, there is a list of all the parking lots and their capacities for your specified organization. Additionally, there is a parking map showing all the parking lots and their capacities under the “Parking Map” tab. Currently, ParkSense is only deployed to the University of Kansas, but we hope to expand in the future.</p>
        </div>
    );
}