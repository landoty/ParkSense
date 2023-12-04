/*
Name: NoPage.js
Description:  Page for when page is not found
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/04/23
*/

import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from 'primereact/button';

export default function NoPage(){
    return(
        <div>
            <style>
                {`
                    .verticalCentering {
                        padding: 10% 0 0 0;
                        text-align: center;
                    }

                    .buttonStyling {
                        border-radius: 0px;
                    }

                    .textStyling {
                        font-size: 150%;
                    }

                `}
            </style>
            <title>Page Not Found | ParkSense</title>
            <center><div className="verticalCentering">
                <div className="textStyling">
                    <h2>Error: Page Not Found</h2>
                    <p>The page that you have tried to access does not exist.</p>
                </div>
                <br></br><br></br>
                <a href="/"><Button className="buttonStyling" label="Back to homepage"/></a>
            </div></center>
        </div>
    );
}