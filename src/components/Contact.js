import React, { useState, useCallback } from 'react';
import { FormControl, Form, Button, FormGroup, Row, Col } from 'react-bootstrap';
import cover from '../assets/images/contact-cover_alt.jpg';
import useInterceptionObserver from '../hooks/useInterceptionObserver';

const Contact = ({ emailCollection }) => {

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        subject: "",
        sender: "",
        mail: ""
    })

    const [isFormValid, setIsFormValid] = useState({
        sender: "",
        fname: "",
        lname: "",
    })

    const [ref, entry] = useInterceptionObserver({
        threshold: [0.2],
    });

    const { isIntersecting } = entry;

    const contactClasses = isIntersecting ? "choose animate-box animated-fast fadeInRight" : "choose animate-box";

    const postMessage = useCallback(async () => {

        console.log(formData);
        try {
           const response =  await fetch("https://us-central1-online-cv-476e2.cloudfunctions.net/app/handleEmail",
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type" : "application/json" 
                    }
                });

            console.log(await response.json());
            //await emailCollection.add(formData);
            //TODO: notification service 
        }
        catch (error) {
            //TODO: notification service
        }

    }, [formData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "sender") {
            const emailReg = /^\S+@\S+$/i;
            const isValid = formData.sender.search(emailReg) < 0;
            setIsFormValid({ ...isFormValid, [name]: isValid });
        }

        if (name === "fname" || name === "lname") {
            setIsFormValid({ ...isFormValid, [name]: value.length > 2 })
        }

        setFormData({ ...formData, [name]: value });
    };

    return (
        <div id="fh5co-consult">
            <div className="video fh5co-video" style={{ backgroundImage: `url(${cover})`, backgroundSize: "cover" }}>
                <div className="overlay"></div>
            </div>
            <div ref={ref} className={contactClasses}>
                <h2>Contact</h2>
                <Form action="#">
                    <Row >
                        <Col md="6">
                            <FormGroup>
                                <FormControl type="text" id="fname" isValid={isFormValid.fname} name="fname" placeholder="Your firstname" value={formData.fname} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="6">
                            <FormGroup>
                                <FormControl type="text" id="lname" isValid={isFormValid.lname} name="lname" placeholder="Your lastname" value={formData.lname} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="12">
                            <FormGroup>
                                <FormControl type="email" id="email" name="sender" isInvalid={isFormValid.sender} placeholder="Your email address" value={formData.sender} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="12">
                            <FormGroup>
                                <FormControl type="text" id="subject" name="subject" placeholder="Your subject of this message" value={formData.subject} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="12">
                            <FormGroup>
                                <FormControl as="textarea" name="mail" id="message" cols="30" rows="10" placeholder="Say something about us" value={formData.mail} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="4  ">
                            <FormGroup>
                                <Button onClick={postMessage}>Send Message</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Contact;