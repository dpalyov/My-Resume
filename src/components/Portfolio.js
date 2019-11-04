import React, { useRef, useEffect } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import ms from '../assets/images/mail_service.png';
import cm from '../assets/images/contact_manager.jpg';
import pf from '../assets/images/portfolio.jpeg';
import fd from '../assets/images/fd.gif';
import useInterceptionObserver from '../hooks/useInterceptionObserver';

const Portfolio = ({data}) => {

	const [ref, entry] = useInterceptionObserver({
		threshold: [0],
	});

	const { isIntersecting } = entry;

	const portfolioClasses = () => {
		let classes = ['text-center col-padding animate-box'];

		if (isIntersecting) {
			classes = [...classes, 'fadeInLeft animated']
		}
		else{
			classes = [...classes, 'fadeOutRight animated']
		}

		return classes.join(' ');
	}

	const dataRef = useRef(data);

	useEffect(() => {
		const images = [ms,cm,pf,fd];
		dataRef.current = data.map((repo,i) => {
			return {...repo, img: images[i] }
		})
	},[data])

    return (
        <div id="fh5co-work" className="fh5co-bg-dark">
		<Container>
			<Row  ref={ref} className={portfolioClasses()}>
				<Col md={{span: 8, offset:2}} className="text-center fh5co-heading">
					<h2>Portfolio</h2>
				</Col>
			</Row>
			<Row>
				{dataRef.current.map((repo, i) => {
				return <Col key={i} md="3" className={portfolioClasses()}>
					<a href={repo.url} rel="noopener noreferrer" target="_blank" className="work" style={{backgroundImage: `url(${repo.img})`}}>
						<div className="desc">
							<h3>{repo.name}</h3>
							<span>{repo.shortDescriptionHTML}</span>
							<br/>
							<span>{repo.languages.nodes.map(l => l.name).join('/')}</span>
						</div>
					</a>
				</Col>
				})}
			</Row>
		</Container>
	</div>
    )
}

export default Portfolio;