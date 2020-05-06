import React, { useRef, useEffect } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import useInterceptionObserver from '../hooks/useInterceptionObserver';
import styles from '../css/Portfolio.module.css';

const Portfolio = ({data}) => {

	// const [ref, entry] = useInterceptionObserver({
	// 	threshold: [0],
	// });

	// const { isIntersecting } = entry;

	// const portfolioClasses = () => {
	// 	let classes = ['text-center col-padding animate-box'];

	// 	if (isIntersecting) {
	// 		classes = [...classes, 'fadeInLeft animated']
	// 	}
	// 	else{
	// 		classes = [...classes, 'fadeOutRight animated']
	// 	}

	// 	return classes.join(' ');
	// }

	// const dataRef = useRef(data);

	// useEffect(() => {
	// 	dataRef.current = data.map((repo,i) => {
	// 		return {...repo, img: images[i] }
	// 	})
	// },[data])

    return (
        <div id="fh5co-work" className="fh5co-bg-dark">
		<Container>
			<Row  className="text-center col-padding">
				<Col md={{span: 8, offset:2}} className="text-center fh5co-heading">
					<h2>Projects</h2>
				</Col>
			</Row>
			<Row>
				{data.map((repo, i) => {
				return <Col key={i} md="3" className={`${styles.flipCard}`}>
					<div  className={styles.flipCardInner} >
						<a href={repo.url} target="_blank" rel="noopener noreferrer">
						<div className={styles.flipCardFront}>
							<h3>{repo.name}</h3>
						</div>
						<div className={styles.flipCardBack}>
							<span>{repo.shortDescriptionHTML.length > 80 ? repo.shortDescriptionHTML.substr(0,80) + "..." : repo.shortDescriptionHTML}</span>
							<br/>
							<span>{repo.languages.nodes.map(l => l.name).join('/')}</span>
						</div>
						</a>
					</div>
				</Col>
				})}
			</Row>
		</Container>
	</div>
    )
}

export default Portfolio;