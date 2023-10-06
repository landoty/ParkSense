/*
Name of program:        Availability.js
Description:            Availability landing page
Inputs:                 None
Outputs:                Centers and places LotDropdown and LotStatus components on page
Collaborators:          Sam Aldeguer, Aaron Horton
Other Sources:          React documentation, PrimeReact documentation
Author:                 Troy D'Amico
Creation Date:          10/5/2023
*/
import LotDropdown from "./LotDropdown"
import LotStatus from "./LotStatus"

export default function Availability(){
    return(
        <center>
            <LotDropdown></LotDropdown>
            <LotStatus></LotStatus>
        </center>
    );
}