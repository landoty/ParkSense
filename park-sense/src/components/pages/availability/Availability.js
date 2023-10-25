/*
Name: Availability.js
Description: Centers and places LotDropdown and LotStatus components on page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useState } from "react";
import LotDropdown from "./LotDropdown"
import LotStatus from "./LotStatus"

export default function Availability(){
    const [selectedLotId, setSelectedLotId] = useState(null);

    const handleLotSelection = (lotId) => {
        setSelectedLotId(lotId);
    };

    return(
        <div>
        <title>Availability</title>
        <center>
            <LotDropdown onLotSelect={handleLotSelection} />
            <LotStatus currentLotId={selectedLotId} />
        </center>
        </div>
    );
}