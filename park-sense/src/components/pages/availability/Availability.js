/*
Name: Availability.js
Description: Centers and places LotDropdown and LotStatus components on page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import LotDropdown from "./LotDropdown";
import LotStatus from "./LotStatus";

export default function Availability(){
    const location = useLocation();
    const [selectedLotId, setSelectedLotId] = useState(location.state?.selectedLotId || null);

    const handleLotSelection = (lotId) => {
        setSelectedLotId(lotId);
    };

    useEffect(() => { setSelectedLotId(location.state?.selectedLotId || null); }, [location, location.state]);

    return(
        <div>
            <title>Availability | ParkSense</title>
            <center style={{paddingTop:'1%'}}>
                    <LotDropdown onLotSelect={handleLotSelection}/>
            </center>
            <div style={{padding:'1%'}}>
                <LotStatus currentLotId={selectedLotId} />
            </div>
        </div>
    );
}