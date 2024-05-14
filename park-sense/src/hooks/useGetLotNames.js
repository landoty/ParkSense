/*
Name: useGetLotNames.js
Description:  React Hook that makes API call and returns all parking lot names
Authors: Troy D'Amico
Date: 12/1/23
*/
import { useEffect, useState } from "react";
import { username, password } from "../authentication";

export const useGetLotNames = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        try {
            //Constructing authorization header
            const auth = 'Basic ' + btoa(`${username}:${password}`);
            const response = await fetch('/api/lot-names', {
                method: 'GET',
                headers: {
                    Authorization: auth
                }
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, []);
    return userData;
};