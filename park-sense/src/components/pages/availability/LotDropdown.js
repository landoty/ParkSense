/*
Name: LotDropdown.js
Description: Dropdown box to display choices of different lots to choose from
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useGetLotNames } from '../../../hooks/useGetLotNames';

export default function LotDropdown({onLotSelect}){
    const lotNames = useGetLotNames();
    const [selectedLot, setSelectedLot] = useState(null);
    const lotChange = (newLot) => {
        setSelectedLot(newLot);
        onLotSelect(newLot);
    };
    return (
        <Dropdown value={selectedLot} onChange={(e) => {lotChange(e.value)}} options={lotNames}
            placeholder='Select a Parking Lot' className='w-full md:w-14rem'/>
    )
}