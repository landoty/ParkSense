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
                const data = require(`./${lotName.currentLotId}.json`);
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