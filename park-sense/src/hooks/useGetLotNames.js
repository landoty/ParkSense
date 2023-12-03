/*
Name: useGetLotNames.js
Description:  React Hook that makes API call and returns all parking lot names
Authors: Troy D'Amico
Date: 12/1/23
*/
import { useEffect, useState } from "react";

export const useGetLotNames = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/api/lot-names');
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