/*
Name: useGetLotInformation.js
Description:  React Hook that returns information relating to the parking lots being tracked
Authors: Troy D'Amico
Date: 12/1/23
*/
import { useState, useEffect } from 'react';

export const useGetLotInformation = (lotName) => {
  const [jsonData, setJsonData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        try {
            if (lotName.currentLotId != null){
                let filename = '';
                switch (lotName.currentLotId){
                    case 'Allen Fieldhouse Parking Garage (AFPK)':
                        filename = 'lot1';
                        break;
                    case 'Rec Center (Lot 90)':
                        filename = 'lot2';
                        break;
                    case 'E. Kansas Union (Lot 16)':
                        filename = 'lot3';
                        break;
                    default:
                        console.log("Error");
                }
                const data = require(`./${filename}.json`);
                setJsonData(data);
            }
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
        };
        fetchData();
    }, [lotName.currentLotId]);
    return jsonData;
};