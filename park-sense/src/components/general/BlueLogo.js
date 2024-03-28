/*
Name: BlueLogo.js
Description: Component to display blue parksense logo
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/04/23
*/
import logo1 from "../../img/parksense-logo.png"

export default function BlueLogo()
{
    return (
        <div>
            <style>
            {`
                .logoStyling {
                    width: 300
                }
            `}
            </style>
            <img src={logo1} alt="ParkSense logo" className="logoStyling"></img>
        </div>
    )
}