/*
Name: EmailForm.js
Description: Component for email form on Contact page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 11/19/23
*/
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function EmailForm(){
    const form = useRef(null);
    const toast = useRef(null);

    const showToastSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'We have received your message!', life: 3000});
    }

    const showToastError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Please fill in all fields.', life: 3000});
      };

    const sendEmail = (e) => {
      e.preventDefault();

      if (!(form.current['from_name'].value) || !(form.current['from_email'].value) || !(form.current['message'].value)) {
        showToastError();
        return;
      }

      emailjs.sendForm('service_xtydq8j', 'template_5izwirw', form.current, 'eWLEQXXLNuhnD7LSe')
        .then((result) => {
            e.target.reset();
            showToastSuccess();
        });
    };
    return (
        <div>
            <style>
            {`
                .EFText {
                    font-size: 22px;
                }

                .messageHeight {
                    height: 150px;
                }
                
                form {
                    display: flex;
                    flex-direction: column;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    width: 500px;
                }
            
                input, textarea {
                    padding: 10px;
                    margin-bottom: 16px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    width: 100%;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                }
            `}
            </style>
            <center><p className="EFText">Do you have any suggestions or concerns for us? Let us know with the form below! We will try to address them as soon as possible.</p></center>
            <center>
                <div>
                    <form ref={form} onSubmit={sendEmail}>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="from_name"/>
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="from_email"/>
                        </div>
                        <div>
                            <label>Message:</label>
                            <textarea name="message" className="messageHeight"/>
                        </div>
                        <Toast ref={toast} />
                        <Button label="Submit" type="submit"/>
                    </form>
                </div>
            </center>
        </div>
    );
}