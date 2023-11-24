/*
Name: EmailForm.js
Description: Component for email form on Contact page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 11/19/23
*/
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function EmailForm(){
    const form = useRef(null);
    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_xtydq8j', 'template_5izwirw', form.current, 'eWLEQXXLNuhnD7LSe')
        .then((result) => {
            e.target.reset();
        });
    };
    return(
        <div>
        <style>
        {`
            .EFText {
                font-size: 22px;
            }
            
            input[type=text], input[type=email], select, textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                resize: vertical;
            }

            textarea {
                height: 150px;
            }
            
            label {
                padding: 12px 12px 12px 0;
                display: inline-block;
                float: left;
            }
            
            .container {
                border-radius: 5px;
                background-color: #f2f2f2;
                padding: 20px;
                width: 60%
            }
        `}
        </style>
            <center><p className="EFText">Do you have any suggestions or concerns for us? Let us know with the form below! We will try to address them as soon as possible.</p></center>
            <center><div className="container">
                <form ref={form} onSubmit={sendEmail}>
                    <div className="row">
                        <label>Name</label>
                        <input type="text" name="from_name"/>
                    </div>
                    <div className="row">
                        <label>Email</label>
                        <input type="email" name="from_email"/>
                    </div>
                    <div className="row">
                        <label>Message</label>
                        <textarea name="message"/>
                    </div>
                    <br></br>
                    <Button label="Submit" type="submit"/>
                </form>
            </div></center>
        </div>
    );
}