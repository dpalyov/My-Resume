import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Services = props => {

    return (
        <div id="fh5co-features" className="animate-box">
		<Container>
			<div className="services-padding">
				<Row>
					<Col md={{span:8, offset:2}} className="text-center fh5co-heading">
						<h2>My Services</h2>
					</Col>
				</Row>
				<Row>
					<Col md='4' className="text-center">
						<div className="feature-left">
							<span className="icon">
								<i><FontAwesomeIcon icon='paint-brush' /></i>
							</span>
							<div className="feature-copy">
								<h3>Web Design</h3>
								<p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
							</div>
						</div>
					</Col>

					<Col md='4' className="text-center">
						<div className="feature-left">
							<span className="icon">
								<i><FontAwesomeIcon icon='briefcase' /></i>
							</span>
							<div className="feature-copy">
								<h3>Branding</h3>
								<p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
							</div>
						</div>
					</Col>
					<Col md='4' className="text-center">
						<div className="feature-left">
							<span className="icon">
								<i><FontAwesomeIcon icon='search' /></i>
							</span>
							<div className="feature-copy">
								<h3>Analytics</h3>
								<p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
							</div>
						</div>
					</Col>
				</Row>
				</div>
			</Container>
		</div>

    )
}

export default Services;