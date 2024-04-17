/*
Name: useGetSingleLotData.js
Description:  React Hook that makes API call and returns data for one parking lot
Authors: Troy D'Amico
Date: 11/3/23
*/
import { useEffect, useState } from "react";
import { username, password } from "../authentication";

export const useGetSingleLotData = (lotName) => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        try {
            if (lotName.currentLotId != null){
                //Constructing authorization header
                const auth = 'Basic ' + btoa(`${username}:${password}`);
                const apiAddress = '/api/parking-lot/' + lotName.currentLotId;
                const response = await fetch(apiAddress, {
                    method: 'GET',
                    headers: {
                        Authorization: auth
                    }
                });
                const data = await response.json();
                setUserData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, [lotName.currentLotId]);
    return userData;
};