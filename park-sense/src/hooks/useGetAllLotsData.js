/*
Name: useGetAllLotsData.js
Description:  React Hook that makes API call and returns data
Authors: Troy D'Amico
Date: 10/20/23
*/
import { useEffect, useState } from "react";

export const useGetAllLotsData = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/api/parking-lots');
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