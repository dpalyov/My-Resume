import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import cover from '../assets/images/cover_bg_3.jpg';
import thumb from '../assets/images/user-3.jpg';

const Header = props => {

    return (
        <header id="fh5co-header" className="fh5co-cover js-fullheight" role="banner" style={{backgroundImage: `url(${cover});`}} data-stellar-background-ratio="0.5">
		<div className="overlay"></div>
		<Container>
			<Row>
				<Col md={{span: 8, offset: 2}} className="text-center">
					<div className="display-t js-fullheight">
						<div className="display-tc js-fullheight animate-box" data-animate-effect="fadeIn">
							<div className="profile-thumb" style={{background: `url(${thumb});`}}></div>
							<h1><span>Dimitar Palyov</span></h1>
							<h3><span>Web Developer</span></h3>
							<p>
								<ul className="fh5co-social-icons">
									<li><a href="#"><i className="icon-twitter2"></i></a></li>
									<li><a href="#"><i className="icon-facebook2"></i></a></li>
									<li><a href="#"><i className="icon-linkedin2"></i></a></li>
									<li><a href="#"><i className="icon-dribbble2"></i></a></li>
								</ul>
							</p>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	</header>
    )
}

export default Header;