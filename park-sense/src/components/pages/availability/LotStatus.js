/*
Name: LotStatus.js
Description:  Parking lot status summary
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useGetSingleLotData } from '../../../hooks/useGetSingleLotData';
import './styles.css';
import { Fieldset } from 'primereact/fieldset';

export default function LotStatus(currentLotId){
    const userData = useGetSingleLotData(currentLotId);
    return(
        <div>
            {currentLotId.currentLotId ? (
                <div className='grid-container'>
                    <center className='header'>
                        <h1>{userData.capacity - userData.cars} Available Spots</h1>
                        <p>({userData.cars}/{userData.capacity} occupied)</p>
                    </center>
                    <div className='info1'>
                        <Fieldset legend='Title 1'>
                            <p className='m-0'>
                                Extra Statistics/Info 1
                            </p>
                        </Fieldset>
                    </div>
                    <div className='info2'>
                        <Fieldset legend='Title 2'>
                            <p className='m-0'>
                                Extra Statistics/Info 2
                            </p>
                        </Fieldset>
                    </div>
                    <div className='info3'>
                        <Fieldset legend='Title 3'>
                            <p className='m-0'>
                                Extra Statistics/Info 3
                            </p>
                        </Fieldset>
                    </div>
                    <div className='info4'>
                        <Fieldset legend='Title 4'>
                            <p className='m-0'>
                                Extra Statistics/Info 4
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
