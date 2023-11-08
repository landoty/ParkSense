/*
Name: WhatIsParkSense.js
Description: Component for "What is ParkSense?" section on About page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/04/23
*/
import React from 'react';
import logo1 from './../../../../img/logos/parksense-logo.png'
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

            .WIPSHeader  {
                text-align: center;
            }
            
            .WIPSBody {
                margin-left: 30px;
                font-size: 22px
            }
        `}
        </style>
        <h1 className="WIPSHeader">What is ParkSense?</h1>
        <p className="WIPSBody">
        <img src={logo1} className="WIPSLogo"></img>
        ParkSense is an online application that tracks the real-time capacity of parking lots for schools and companies. At times, some parking lots at the University of Kansas have no open spots, causing students and faculty to waste time by aimlessly driving in these lots only to not find a spot. This inspired us to help people everywhere save time and energy by having them know which lot to park in ahead of time. Under the “Availability” tab, there is a list of all the parking lots and their capacities for your specified organization. Additionally, there is a parking map showing all the parking lots and their capacities under the “Parking Map” tab. Currently, ParkSense is only deployed to the University of Kansas, but we hope to expand in the future.
</p>
        </div>
    );
}