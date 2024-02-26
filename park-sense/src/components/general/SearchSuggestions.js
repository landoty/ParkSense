/*
Name: SearchSuggestions.js
Description: Component for search bar suggestions drop down
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 2/25/24
*/
import React from "react";
import Suggestion from './Suggestion.js'

const SearchSuggestions = ({suggestions}) => {
    return (
        <div>
            {suggestions.map((suggestion, key) => {
                return <Suggestion suggestion={suggestion} key={key}></Suggestion>;
            })}
        </div>
    )
}

export default SearchSuggestions;