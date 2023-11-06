/*
Name: LotDropdown.js
Description: Dropdown box to display choices of different lots to choose from
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';


export default function LotDropdown({onLotSelect}){
    const [selectedLot, setSelectedLot] = useState(null);
    const lots = ['lot1','lot2','lot3'];
    const lotChange = (newLot) => {
        setSelectedLot(newLot);
        onLotSelect(newLot);
    };
    return (
        <Dropdown value={selectedLot} onChange={(e) => {lotChange(e.value)}} options={lots}
            placeholder='Select a Parking Lot' className='w-full md:w-14rem'/>
    )
}