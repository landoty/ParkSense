/*
Name: Footer.js
Description:  Component for the footer that is present on all pages
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 11/24/23
*/
import React from 'react';
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function Footer(){
    return(
        <div>
            <style>
                {`
                    body {
                        min-height: 100vh;
                        position: relative;
                    }

                    .footerStyling {
                        background: #0C3C9C;
                        color: #fff;
                        padding: 15px 0;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        min-height: 20px;
                    }

                    .containerStyling {
                        width: 85%;
                        margin: 0 auto;
                    }

                    .footerContentStyling {
                        display: flex;
                        justify-content: space-between;
                    }

                    .copyrightStyling {
                        margin: 0;
                    }

                    .nav {
                        margin: 0;
                        padding: 0;
                    }

                    .nav li {
                        display: inline-block;
                        margin-right: 50px;
                    }

                    .nav li a {
                        color: inherit;
                        text-decoration: none;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                `}
            </style>
            <br></br><br></br><br></br>
            <footer className="footerStyling">
                <div className="containerStyling">
                    <div className="footerContentStyling">
                        <ul className="nav">
                            <li><a href="/">Home</a></li>
                            <li><a href="/availability">Availability</a></li>
                            <li><a href="/parking-map">Parking Map</a></li>
                        </ul>
                        <p className="copyrightStyling">Copyright © 2023 ParkSense - All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}