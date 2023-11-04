/*
Name: LotStatus.js
Description:  Parking lot status summary
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useGetSingleLotData } from '../../../hooks/useGetSingleLotData';

export default function LotStatus(currentLotId){
    const userData = useGetSingleLotData(currentLotId);
    return(
        <div>
            {currentLotId.currentLotId ? (
                <div>
                    <p>Lot: {currentLotId.currentLotId}</p>
                    <p>Capacity: {userData.capacity}</p>
                    <p>Cars: {userData.cars}</p>
                </div>
            ) : (
                <p>Please select a parking lot above</p>
            )}
        </div>
    );
}
