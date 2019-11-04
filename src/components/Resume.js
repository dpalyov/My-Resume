import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInterceptionObserver from '../hooks/useInterceptionObserver';


const Resume = ({exp, education}) => {

	const [ref, entry] = useInterceptionObserver({
		threshold: [0.2],
	  });

	const {isIntersecting} = entry;

	const liClasses = (index) => {
		let classes = ['animate-box'];

		if(index !== undefined){
			if(index % 2 === 0){
				classes = [...classes, 'timeline-inverted'];
			}
			else {
				classes = [...classes, 'timeline-unverted'];
			}
		}
	
		if(isIntersecting && index % 2 === 0){
			classes = [...classes, 'fadeInLeft animated-fast']

		}
		else if(isIntersecting && index % 2 !== 0){
			classes = [...classes, 'fadeInRight animated-fast']

		}
		else if(!isIntersecting && index % 2 === 0){
			classes = [...classes, 'fadeOutLeft animated']

		}
		else if(!isIntersecting && index % 2 !== 0){
			classes = [...classes, 'fadeOutRight animated']

		}
		else if(isIntersecting){
			classes = [...classes, 'fadeInUp animated-fast']
		}

		return classes.join(' ');

	}

    return (
        <div id="fh5co-resume" className="fh5co-bg-color">
		<Container  ref={ref}  >
			<Row className={liClasses}>
				<Col md={{span: 8, offset: 2}} className="text-center fh5co-heading">
					<h2>My Resume</h2>
				</Col>
			</Row>
			<Row>
				<Col md={{span: 12, offset: 0}}>
					<ul className="timeline"    >
						<li className={`timeline-heading text-center ${liClasses()}`}>
							<div><h3>Work Experience</h3></div>
						</li>
						{exp.map((e,i) => <li key={i} className={liClasses(i)}>
							<div className="timeline-badge"><i><FontAwesomeIcon  icon='suitcase'/></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h3 className="timeline-title">{e.role}</h3>
									<span className="company">{e.name} - {e.startDate} - {e.endDate||'Current'}</span>
								</div>
								<div className="timeline-body">
									<p>{e.content}</p>
								</div>
							</div>
						</li>
						)}
						<br/>
						<li ref={ref} className={`timeline-heading text-center ${liClasses()}`}>
							<div><h3>Education</h3></div>
						</li>
						{education.map((e,i) => <li key={exp.length + i} className={liClasses(exp.length + i)}>
							<div className="timeline-badge"><i><FontAwesomeIcon  icon='graduation-cap'/></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h3 className="timeline-title">{`${e.degree} degree`}</h3>
									<span className="company">{e.school} - {e.dateStart} - {e.dateEnd}`</span>
								</div>
								<div className="timeline-body">
									<p>{e.fieldOfStudy}</p>
								</div>
							</div>
						</li>
						)}
			    	</ul>
				</Col>
			</Row>
		</Container>
	</div>
    )
};

export default Resume;