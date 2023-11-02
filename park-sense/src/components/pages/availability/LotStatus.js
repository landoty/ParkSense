/*
Name: LotStatus.js
Description:  Parking lot status summary
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import { useGetAllLotsData } from '../../../hooks/useGetAllLotsData';

export default function LotStatus(currentLotId){
    const userData = useGetAllLotsData();

    return(
        <div>
            {userData ? (
                Object.keys(userData).map((key) => (
                    <div key={key}>
                        <p>Lot: {key}</p>
                        <p>Capacity: {userData[key].capacity}</p>
                        <p>Cars: {userData[key].cars}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
