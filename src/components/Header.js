import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import cover from '../assets/images/gif-cover.gif';
import thumb from '../assets/images/thumb2.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedinIn, faTwitter, faFacebook, faGithub} from '@fortawesome/free-brands-svg-icons'

const Header = props => {

    return (
        <header id="fh5co-header" className="fh5co-cover js-fullheight" role="banner" style={{backgroundImage: `url(${cover})`}} data-stellar-background-ratio="0.5">
		<div className="overlay"></div>
		<Container>
			<Row>
				<Col md={{span: 8, offset: 2}} className="text-center">
					<div className="display-t js-fullheight">
						<div className="display-tc js-fullheight animate-box" data-animate-effect="fadeIn">
							<div className="profile-thumb" style={{background: `url(${thumb})`}}></div>
							<h1><span>Dimitar Palyov</span></h1>
							<h3><span>Web Developer/Data enthusiast/Adventurer</span></h3>
								<ul className="fh5co-social-icons">
									<li><a href="#"><FontAwesomeIcon icon={faTwitter} size='2x'/></a></li>
									<li><a href="https://facebook.com/dimitar.palyov"><FontAwesomeIcon icon={faFacebook} size='2x'/></a></li>
									<li><a href="#"><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></a></li>
									<li><a href="#"><FontAwesomeIcon icon={faGithub} size='2x'/></a></li>
								</ul>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	</header>
    )
}

export default Header;