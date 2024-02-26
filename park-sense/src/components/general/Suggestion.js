/*
Name: Suggestion.js
Description: Component for each individual suggestion in drop down
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 2/25/24
*/
import React, { useState } from 'react';

const Suggestion = ({suggestion}) => {
    return(
        <div>{suggestion}</div>
    )
}

export default Suggestion;