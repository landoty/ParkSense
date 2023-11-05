/*
Name: WhatIsParkSense.js
Description: Component for navigation bar on home page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/25/23
*/

import React, {useState} from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/lara-light-blue/theme.css";
import WhatIsParkSense from './WhatIsParkSense';
import AboutImage from './../../../img/home-img/lot1.jpg';
import TeamImage from './../../../img/home-img/lot2.jpg';
import ContactImage from './../../../img/home-img/lot3.jpg';
import HowItWorks from './HowItWorks';

export default function HomeNavBar()
{
    const [active, setActive] = useState("About")
    const [activeIndex, setActiveIndex] = useState(0)
    const items = [
        {
            label: 'About',
        },
        {
            label: 'Team',
        },
        {
            label: 'Contact Us',
        },
    ];

    const changeTab = (event) => {
        setActive(event.value.label);
        setActiveIndex(event.index)
      };

    return (
        <div className="card">
            <style>
            {`
                .HomeImages {
                    width: 100%;
                }
            `}
            </style>
            <div>
                {active === "About" && <img src={AboutImage} className="HomeImages"></img>}
                {active === "Team" && <img src={TeamImage} className="HomeImages"></img>}
                {active === "Contact Us" && <img src={ContactImage} className="HomeImages"></img>}
            </div>
            <TabMenu model={items} activeItem={active} activeIndex={activeIndex} onTabChange={changeTab} />
            <div>
                {active === "About" && 
                    <div>
                        <WhatIsParkSense></WhatIsParkSense>
                        <br></br>
                        <HowItWorks></HowItWorks>
                    </div>}
                {active === "Team"}
                {active === "Contact Us"}
            </div>
        </div>
    )
}