import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedinIn, faTwitter, faFacebook, faGithub} from '@fortawesome/free-brands-svg-icons';
import useInterceptionObserver from '../hooks/useInterceptionObserver';

const About = props => {

	const [ref, entry] = useInterceptionObserver({
		threshold: [0.1],
	});

	const { isIntersecting } = entry;

	const aboutClasses = isIntersecting ? ['animate-box fadeInUp animated-fast'].join(' ') : ['animate-box'].join(' ');

    return (
        <div id="fh5co-about" ref={ref} className={aboutClasses}>
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
						<li><span className="first-block">Location:</span><span className="second-block">Sofia, Bulgaria</span></li>
					</ul>
				</Col>
				<Col md='8'>
					<h2>Hello There!</h2>
					<p>My name is Dimitar Palyov</p>
					<p>I am a passionate developer with attention to detail.
					I`ve been working as a developer for more than 3 years now, closely on web development in the past 2 years. I like to experiment with new technologies and keep myself challenged. Modern world of development is expecting a higly aggressive learning curve to follow, thus exploring new horizons is part of my daily routine.
					</p>
					<p>
					Apart from programming, I enjoy hiking, photography and video games.
					</p>
                        <ul className="fh5co-social-icons">
                            <li><a href="https://twitter.com/SniXz86" rel="noopener noreferrer"><i><FontAwesomeIcon icon={faTwitter} size='2x'/></i></a></li>
                            <li><a href="https://facebook.com/dimitar.palyov" rel="noopener noreferrer"><i><FontAwesomeIcon icon={faFacebook} size='2x'/></i></a></li>
                            <li><a href="https://www.linkedin.com/in/dimitar-palyov-42741798/" rel="noopener noreferrer"><i><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></i></a></li>
                            <li><a href="https://github.com/dpalyov" rel="noopener noreferrer"><i><FontAwesomeIcon icon={faGithub} size='2x'/></i></a></li>
                        </ul>
				</Col>
			</Row>
		</Container>
	</div>
    )
}

export default About;