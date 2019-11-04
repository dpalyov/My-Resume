import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInterceptionObserver from '../hooks/useInterceptionObserver';


const Services = ({data}) => {

	const [ref, entry] = useInterceptionObserver({
		threshold: [0],
	});

	const { isIntersecting } = entry;

	const serviceClasses = isIntersecting ? "animate-box animated-fast fadeInUp" : "animate-box";

    return (
        <div id="fh5co-features" ref={ref} className={serviceClasses}>
		<Container>
			<div className="services-padding">
				<Row>
					<Col md={{span:8, offset:2}} className="text-center fh5co-heading">
						<h2>My Services</h2>
					</Col>
				</Row>
				<Row>
					{data.map(service => {
						const {name, content, icon, id} = service;
						return <Col key={id} md='4' className="text-center">
						<div className="feature-left">
							<span className="icon">
								<i><FontAwesomeIcon icon={icon} /></i>
							</span>
							<div className="feature-copy">
								<h3>{name}</h3>
								<p>{content}</p>
							</div>
						</div>
					</Col>})}
				</Row>
				</div>
			</Container>
		</div>

    )
}

export default Services;