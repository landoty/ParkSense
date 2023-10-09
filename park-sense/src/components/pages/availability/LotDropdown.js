/*
Name of program:        LotDropdown.js
Description:            Dropdown box with all of the different lots
Inputs:                 None
Outputs:                Returns dropdown box with values
Collaborators:          Sam Aldeguer, Aaron Horton
Other Sources:          React documentation, PrimeReact documentation
Author:                 Troy D'Amico
Creation Date:          10/5/2023
*/
import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';


export default function LotDropdown(){
    const [selectedLot, setSelectedLot] = useState(null);
    const lots = ['88','89','90','91','92'];
    return (
        <Dropdown value={selectedLot} onChange={(e) => setSelectedLot(e.value)} options={lots}
            placeholder='Select a Parking Lot' className='w-full md:w-14rem'/>
    )
}