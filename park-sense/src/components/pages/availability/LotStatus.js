/*
Name: LotStatus.js
Description:  Parking lot status summary
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useGetSingleLotData } from '../../../hooks/useGetSingleLotData';
import { useGetLotInformation } from '../../../hooks/useGetLotInformation';
import './styles.css';
import { Fieldset } from 'primereact/fieldset';

export default function LotStatus(currentLotId){
    const capacityInfo = useGetSingleLotData(currentLotId);
    const generalInfo = useGetLotInformation(currentLotId);
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
                            <p className='m-0'>
                                Graph showing average capacity over one day/one week
                            </p>
                        </Fieldset>
                    </div>
                    <div className='info3'>
                        <Fieldset legend='Image on Map'>
                            <p className='m-0'>
                                Image of the parking lot on a map
                            </p>
                        </Fieldset>
                    </div>
                    <div className='info4'>
                        <Fieldset legend='Actual Image of Lot'>
                            <p className='m-0'>
                                Image of the parking lot
                            </p>
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
