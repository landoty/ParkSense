/*
Name: Suggestion.js
Description: Component for each individual suggestion in drop down
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 2/25/24
*/
import React, { useState } from 'react';

const Suggestion = ({suggestion, onClick}) => {
    return(
        <div onClick = {() => onClick(suggestion)} style={{cursor: 'pointer'}}>
            {suggestion}
        </div>
    )
}

export default Suggestion;