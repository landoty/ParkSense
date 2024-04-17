/*
Name: useGetSingleLotData.js
Description:  React Hook that reads API password from password.txt
Authors: Troy D'Amico
Date: 4/16/24
*/
import passwordFile from './password.txt';

const getPassword = async () => {
    try {
        const response = await fetch(passwordFile);
        if (response.ok) {
            const text = await response.text();
            return text;
        } else {
            console.error('Error fetching password:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching password:', error);
        return null;
    }
};

export const username = 'ParkSense_Admin';
export const password = await getPassword();