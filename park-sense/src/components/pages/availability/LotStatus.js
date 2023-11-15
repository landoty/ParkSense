/*
Name: LotStatus.js
Description:  Parking lot status summary
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useGetSingleLotData } from '../../../hooks/useGetSingleLotData';
import './styles.css';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';

export default function LotStatus(currentLotId){
    const userData = useGetSingleLotData(currentLotId);
    return(
        <div>
            {currentLotId.currentLotId ? (
                <div className='grid-container'>
                    <div>
                    {/* <div className='top-middle'> */}
                        <Card title='Title'>
                            <p className='m-0'>
                                Option 1
                            </p>
                        </Card>
                    </div>
                    <div>
                        <Fieldset legend='Title'>
                            <p className='m-0'>
                                Option 2
                            </p>
                        </Fieldset>
                    </div>
                    <div>
                        <Panel header='Title'>
                            <p className='m-0'>
                                Option 3
                            </p>
                        </Panel>
                    </div>
                </div> 
                // <div>
                //     <p>Lot: {currentLotId.currentLotId}</p>
                //     <p>Capacity: {userData.capacity}</p>
                //     <p>Cars: {userData.cars}</p>
                // </div>
            ) : (
                <p>Please select a parking lot above</p>
            )}
        </div>
    );
}
