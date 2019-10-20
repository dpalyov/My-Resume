import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedinIn, faTwitter, faFacebook, faGithub} from '@fortawesome/free-brands-svg-icons';

const About = props => {

    return (
        <div id="fh5co-about" className="animate-box">
		<Container>
			<Row>
				<Col md={{span:8, offset:2}} className="text-center fh5co-heading">
					<h2>About Me</h2>
				</Col>
			</Row>
			<Row>
				<Col md='4'>
					<ul className="info">
						<li><span className="first-block">Full Name:</span><span className="second-block">Dimitar Palyov</span></li>
						<li><span className="first-block">Phone:</span><span className="second-block">+359 897 86 40 34</span></li>
						<li><span className="first-block">Email:</span><span className="second-block">palyov.dimitar@gmail.com</span></li>
						<li><span className="first-block">Address:</span><span className="second-block">Drujba 2, building 291, Sofia, Bulgaria</span></li>
					</ul>
				</Col>
				<Col md='8'>
					<h2>Hello There!</h2>
					<p>There live the blind texts far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in bookmarksgrove there live the blind texts far from the countries.</p>
					<p>Far far away, behind the word mountains, Quos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci there live the blind texts from the countries Vokalia and Consonantia, there live the blind texts. Quos quia provident consequuntur culpa facere ratione maxime commodi voluptates id repellat velit eaque aspernatur expedita. Possimus itaque adipisci.</p>
					<p>
                        <ul className="fh5co-social-icons">
                            <li><a href="#"><i><FontAwesomeIcon icon={faTwitter} size='2x'/></i></a></li>
                            <li><a href="https://facebook.com/dimitar.palyov"><i><FontAwesomeIcon icon={faFacebook} size='2x'/></i></a></li>
                            <li><a href="#"><i><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></i></a></li>
                            <li><a href="#"><i><FontAwesomeIcon icon={faGithub} size='2x'/></i></a></li>
                        </ul>
					</p>
				</Col>
			</Row>
		</Container>
	</div>
    )
}

export default About;