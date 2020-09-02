import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import styles from '../css/Portfolio.module.css';

const Portfolio = ({data}) => {

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
							<span title={repo.description}>{repo.description.length > 80 ? repo.description.substr(0,80) + "..." : repo.description}</span>
							<br/>
							<span>{repo.languages.join('/')}</span>
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