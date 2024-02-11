/*
Name: SearchBar.js
Description: Component for search bar on main navigation bar
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 2/10/23
*/

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

const SearchBar = ({ onSearch }) => {
    const [searchedLot, setSearchedLot] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (onSearch) {
                onSearch(searchedLot);
            }
        }
    };

    return (
        <InputText placeholder="Search Lot" type="text" className="w-full"
            value={searchedLot} 
            onChange={(e) => {setSearchedLot(e.target.value)}}
            onKeyDown={handleKeyDown}
        />
    )
}
export default SearchBar;