/*
Name: TroyDamico.js
Description: Component for Troy D'Amico on Team Page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 11/5//23
*/

import React from 'react';
import headshot from "./../../../img/home-img/TroyDamico.png"
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function AaronHorton() {
    return (
        <div>
        <style>
        {`
            .Headshot {
                width: 300px;
                vertical-align: top;
            }

            .FigStyling {
                display: inline-block;
                border: 3px solid black;
                margin: 20px;
            }

            .CaptionStyling {
                text-align: center;
            }

            .TopSpacing {
                margin-top: 0px;
            }
            
            .BottomSpacing {
                margin-bottom: 0px;
            }
        `}
        </style>
        <figure className="FigStyling FigAlign">
            <img src={headshot} className="Headshot"></img>
            <figcaption className="CaptionStyling">
                <h2 className="BottomSpacing">Troy D'Amico</h2>
                <p className="TopSpacing BottomSpacing">University of Kansas Class of 2024</p>
                <p>Front-End & Middle-End Development</p>
            </figcaption>
        </figure>
        </div>
    )
}