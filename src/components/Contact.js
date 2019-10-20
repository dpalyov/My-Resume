import React from 'react';
import { FormControl, Form, Button, FormGroup, Row, Col} from 'react-bootstrap';
import cover from '../assets/images/contact-cover.jpg';

const Contact = props => {

    return (
        <div id="fh5co-consult">
		<div className="video fh5co-video" style={{backgroundImage: `url(${cover})`, backgroundSize: "cover"}}>
			<div className="overlay"></div>
		</div>
		<div className="choose animate-box">
			<h2>Contact</h2>
			<Form action="#">
				<Row >
                    <Col md="6">
                        <FormGroup>
                                <FormControl type="text" id="fname"  placeholder="Your firstname" />
                        </FormGroup>
                    </Col>
				</Row>
				<Row >
                    <Col md="6">
                        <FormGroup>
                                <FormControl type="text" id="lname" placeholder="Your lastname"/>
                        </FormGroup>
                    </Col>
				</Row>
				<Row >
                    <Col md="12">
                        <FormGroup>
                                <FormControl type="text" id="email"  placeholder="Your email address"/>
                        </FormGroup>
                    </Col>
				</Row>
				<Row >
                    <Col md="12">
                        <FormGroup>
                                <FormControl type="text" id="subject" placeholder="Your subject of this message" />
                        </FormGroup>
                    </Col>
				</Row>
				<Row >
                    <Col md="12">
                        <FormGroup>
                                <FormControl as="textarea" name="message" id="message" cols="30" rows="10" placeholder="Say something about us" />
                        </FormGroup>
                    </Col>
				</Row>
				<Row >
                    <Col md="3">
                        <FormGroup>
                            <Button >Send Message</Button>
                        </FormGroup>
                    </Col>
				</Row>
			</Form>	
		</div>
	</div>
    )
}

export default Contact;