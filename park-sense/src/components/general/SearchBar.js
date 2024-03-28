/*
Name: SearchBar.js
Description: Component for search bar on main navigation bar
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 2/10/24
*/
import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useGetLotNames } from '../../hooks/useGetLotNames';
import SearchSuggestions from './SearchSuggestions.js';

const SearchBar = ({onSearch}) => {
    const [searchedLot, setSearchedLot] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const clickAwayState = useRef(null);
    const lotNames = useGetLotNames();
    
    const handleKeyPress = (e) => {
        let suggestions = [];
        if (e.key === 'Enter')
        {
            e.preventDefault();
            if (onSearch)
            {
                onSearch(searchedLot);
            }
        }
        else
        {
            for (let i = 0; i < lotNames.length; i++)
            {
                if (searchedLot.length > 0)
                {
                    if (lotNames[i].slice(0, searchedLot.length).toLowerCase() == searchedLot.toLowerCase())
                    {
                        suggestions.push(lotNames[i])
                    }
                }
            }
        }
        setSearchSuggestions(suggestions);
    };

    const handleClickSuggestion = (suggestion) => {
        document.getElementById('searchBar').focus();
        setSearchSuggestions([]);
        setSearchedLot(suggestion);
    };

    useEffect(() => { 
        const handleClickAway = (e) => {
            if (clickAwayState.current.contains(e.target) == false && clickAwayState.current) 
            {
                setSearchSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickAway);
        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    });

    return (
        <div ref={clickAwayState}>
            <style>
            {`
                .outerStyling {
                    position: relative;
                }

                .innerStyling {
                    position: absolute;
                    width: 100%;
                }
            `}
            </style>
            <div>
                <InputText
                    id="searchBar" 
                    placeholder="Search Lot" 
                    type="text" 
                    className="w-full"
                    value={searchedLot}
                    onChange={(e) => {setSearchedLot(e.target.value)}}
                    onKeyDown={handleKeyPress}
                />
                <div className="outerStyling">
                    <div className="innerStyling">
                        <SearchSuggestions suggestions={searchSuggestions} onClickSuggestion={handleClickSuggestion}></SearchSuggestions>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;