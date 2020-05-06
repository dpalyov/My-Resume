import React, { useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import cover from '../assets/images/gif-cover.gif';
import thumb from '../assets/images/thumb.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedinIn, faTwitter, faFacebook, faGithub} from '@fortawesome/free-brands-svg-icons'

const Header = ({pageLoaded}) => {

	const headerClasses = pageLoaded ? 'display-tc  animate-box' : 'display-tc animate-box fadeIn animated-fast';


	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	const resize = () => {

		if(!isMobile.any()){
			return {
				height: window.innerHeight,
				backgroundImage: `url(${cover})`
			}
		}
		else{
			return {
				backgroundImage: `url(${cover})`
			}
		}
	}


    return (
        <header id="fh5co-header" className="fh5co-cover " role="banner" style={resize()} data-stellar-background-ratio="0.5">
		<div className="overlay"></div>
		<Container >
			<Row>
				<Col  md={{span: 8, offset: 2}} className="text-center">
					<div className="display-t ">
						<div  className={headerClasses} data-animate-effect="fadeIn">
							{/* <div  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="avatar-wrapper">
								{isHovered ? <Avatar/> : }
							</div> */}
							<div className="profile-thumb" style={{background: `url(${thumb})`}}></div>
							<h1><span>Dimitar Palyov</span></h1>
							<h3><span>Web Developer/Data enthusiast</span></h3>
								<ul className="fh5co-social-icons">
									<li><a href="https://twitter.com/SniXz86" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size='2x'/></a></li>
									<li><a href="https://facebook.com/dimitar.palyov" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size='2x'/></a></li>
									<li><a href="https://www.linkedin.com/in/dimitar-palyov-42741798/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></a></li>
									<li><a href="https://github.com/dpalyov" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} size='2x'/></a></li>
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