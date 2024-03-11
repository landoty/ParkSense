/*
Name: Suggestion.js
Description: Component for each individual suggestion in drop down
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 2/25/24
*/
import React from 'react';

const Suggestion = ({suggestion, onClick}) => {
    return(
        <div>
            <style>
            {`
                .suggestionStyling {
                    cursor: pointer;
                    color: black;
                    padding: 5px;
                }
            `}
            </style>
            <div onClick = {() => onClick(suggestion)} className="suggestionStyling">
                {suggestion}
            </div>
        </div>
    )
}

export default Suggestion;