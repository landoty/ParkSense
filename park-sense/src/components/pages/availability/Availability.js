/*
Name: Availability.js
Description: Centers and places LotDropdown and LotStatus components on page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
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