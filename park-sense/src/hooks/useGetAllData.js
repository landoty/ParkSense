/*
Name: useGetAllData.js
Description:  React Hook that makes API call and returns all data
Authors: Troy D'Amico
Date: 10/20/23
*/
import { useEffect, useState } from "react";
import { username, password } from "../authentication";

export const useGetAllData = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        try {
            //Constructing authorization header
            const auth = 'Basic ' + btoa(`${username}:${password}`);
            const response = await fetch('/api/parking-lots', {
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