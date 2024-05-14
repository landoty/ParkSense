/*
Name: LotStatus.js
Description:  Parking lot status summary
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useGetSingleLotData } from '../../../hooks/useGetSingleLotData';
import { useGetLotInformation } from '../../../hooks/useGetLotInformation';
import { useGetAvgBusyTimesSingleLot } from '../../../hooks/useGetAvgBusyTimesSingleLot';
import './styles.css';
import { Fieldset } from 'primereact/fieldset';
import AvgBusyTimesChart from '../../general/AvgBusyTimesChart';

export default function LotStatus(currentLotId){
    const capacityInfo = useGetSingleLotData(currentLotId);
    const generalInfo = useGetLotInformation(currentLotId);
    const avgBusyTimes = useGetAvgBusyTimesSingleLot(currentLotId);
    return(
        <div>
            {currentLotId.currentLotId ? (
                <div className='grid-container'>
                    <center className='header'>
                        <h1>{capacityInfo.capacity - capacityInfo.cars} Available Spots</h1>
                        <p>({capacityInfo.cars}/{capacityInfo.capacity} occupied)</p>
                    </center>
                    <div className='info1'>
                        <Fieldset legend='Lot Information'>
                            <p className='m-0'>
                                Parking Pass: {generalInfo.pass}
                            </p>
                            <p className='m-0'>
                                Hours Enforced: {generalInfo.hours}
                            </p>
                            <p className='m-0'>
                                Nearby Amenities:
                            </p>
                            <ul>
                                {
                                generalInfo.amenities ? (
                                generalInfo.amenities.map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))):(<p></p>)
                                }
                            </ul>
                        </Fieldset>
                    </div>
                    <div className='info2'>
                        <Fieldset legend='Average Busy Times'>
                            <AvgBusyTimesChart avgBusyTimes={avgBusyTimes}></AvgBusyTimesChart>
                        </Fieldset>
                    </div>
                </div> 
                // To get lot name: {currentLotId.currentLotId}
            ) : (
                <center>
                    <h1>Please select a parking lot above</h1>
                </center>
            )}
        </div>
    );
}
