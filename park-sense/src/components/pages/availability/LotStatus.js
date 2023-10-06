/*
Name of program:        LotStatus.js
Description:            Parking lot status summary
Inputs:                 None
Outputs:                Returns a test status summary for a parking lot
Collaborators:          Sam Aldeguer, Aaron Horton
Other Sources:          React documentation
Author:                 Troy D'Amico
Creation Date:          10/5/2023
*/
export default function LotStatus(){
    return(
        <div>
            <h1>Availability:</h1>
                <p>Spots Available: 11/100</p>
            <br></br>
            <h1>General Info:</h1>
            <p>Lot Parking Pass: Yellow</p>
            <p>Yellow Pass Requred (8am-5pm Monday-Friday)</p>
        </div>
    );
}
