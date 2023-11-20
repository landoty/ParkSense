/*
Name: EmailForm.js
Description: Component for email form on Contact page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 11/19/23
*/
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function EmailForm(){
    const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_xtydq8j', 'template_5izwirw', form.current, 'eWLEQXXLNuhnD7LSe')
        .then((result) => {
            e.target.reset();
        });
    };
    return(
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="from_name"/>
            <label>Email</label>
            <input type="email" name="from_email"/>
            <label>Message</label>
            <textarea name="message"/>
            <input type="submit" value="Send"/>
        </form>
    );
}