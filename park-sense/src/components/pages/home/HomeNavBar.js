/*
Name: WhatIsParkSense.js
Description: Component for navigation bar on home page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/25/23
*/
import React, {useState} from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import "primereact/resources/themes/lara-light-blue/theme.css";
import WhatIsParkSense from './about/WhatIsParkSense';
import AboutImage from './../../../img/home-img/lot1.jpg';
import TeamImage from './../../../img/home-img/lot2.jpg';
import ContactImage from './../../../img/home-img/lot3.jpg';
import HowItWorks from './about/HowItWorks.js';
import SamAldeguer from './team/SamAldeguer.js';
import AaronHorton from './team/AaronHorton.js';
import TroyDamico from './team/TroyDamico.js';
import SepehrNoori from './team/SepehrNoori.js';
import LandenDoty from './team/LandenDoty.js';

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
                .CardRow {
                    display: flex;
                    float: left;
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
                {active === "Team" &&
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <h1>Meet the Team</h1>
                        <div className="CardRow">
                            <SamAldeguer></SamAldeguer>
                            <AaronHorton></AaronHorton>
                            <TroyDamico></TroyDamico>
                        </div>
                        <div className="CardRow">
                            <SepehrNoori></SepehrNoori>
                            <LandenDoty></LandenDoty>
                        </div>
                    </div>
                    }
                {active === "Contact Us"}
            </div>
        </div>
    )
}