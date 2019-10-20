import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import pic1 from '../assets/images/portfolio-1.jpg';
import pic2 from '../assets/images/portfolio-2.jpg';
import pic3 from '../assets/images/portfolio-3.jpg';

const Portfolio = props => {

    return (
        <div id="fh5co-work" className="fh5co-bg-dark">
		<Container>
			<Row className="animate-box">
				<Col md={{span: 8, offset:2}} className="text-center fh5co-heading">
					<h2>Work</h2>
				</Col>
			</Row>
			<Row>
				<Col md="3" className="text-center col-padding animate-box">
					<a href="#" className="work" style={{backgroundImage: `url(${pic1})`}}>
						<div className="desc">
							<h3>Project Name</h3>
							<span>Illustration</span>
						</div>
					</a>
				</Col>
				<Col md="3" className="text-center col-padding animate-box">
					<a href="#" className="work" style={{backgroundImage: `url(${pic2})`}}>
						<div className="desc">
							<h3>Project Name</h3>
							<span>Brading</span>
						</div>
					</a>
				</Col>
				<Col md="3" className="text-center col-padding animate-box">
					<a href="#" className="work" style={{backgroundImage: `url(${pic3})`}}>
						<div className="desc">
							<h3>Project Name</h3>
							<span>Illustration</span>
						</div>
					</a>
				</Col>
			</Row>
		</Container>
	</div>
    )
}

export default Portfolio;