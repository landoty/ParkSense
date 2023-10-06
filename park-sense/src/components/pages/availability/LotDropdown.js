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