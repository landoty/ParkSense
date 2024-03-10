/*
Name: MainNavBar.js
Description: Component to display main navigation bar
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/03/23
*/
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.js'
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import logo2 from "../../img/logos/parksense-logo2.png";
import { useGetLotNames } from '../../hooks/useGetLotNames';

export default function MainNavBar(){
    const navigate = useNavigate();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            command: () => {navigate('/');}
        },
        {
            label: 'Availability',
            icon: 'pi pi-fw pi-pencil',
            command: () => {navigate('/availability');}
        },
        {
            label: 'Parking Map',
            icon: 'pi pi-fw pi-user',
            command: () => {navigate('parking-map');}
        }
    ];

    const lotNames = useGetLotNames();
    
    const conductSearch = (searchText) => {
        if (lotNames.includes(searchText))
        {
            navigate('/availability', { state: { selectedLotId: searchText } });
        }
        else {
            alert ("Lot not found")
        }
    };

    const start = <a href="/"><img alt="logo" src={logo2} height="40" className="mr-2"></img></a>;
    const end = <SearchBar onSearch={conductSearch}></SearchBar>
    return (
        <Menubar model={items} start={start} end={end}/>
    )
}