import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInterceptionObserver from '../hooks/useInterceptionObserver';


const Resume = ({exp}) => {

	const [ref, entry] = useInterceptionObserver({
		threshold: [0],
	  });

	const {isIntersecting, intersectionRatio} = entry;

    return (
        <div id="fh5co-resume" className="fh5co-bg-color">
		<Container  >
			<Row className="animate-box" >
				<Col md={{span: 8, offset: 2}} className="text-center fh5co-heading">
					<h2>My Resume</h2>
				</Col>
			</Row>
			<Row>
				<Col md={{span: 12, offset: 0}}>
					<ul className="timeline"   ref={ref}  >
						<li className="timeline-heading text-center animate-box">
							<div><h3>Work Experience</h3></div>
						</li>
						{exp.map((e,i) => <li key={i} className={`animate-box ${i % 2 !== 0 ? 'timeline-inverted': 'timeline-unverted '} ${isIntersecting ? 'fadeInUp animated-fast' : ''}`}>
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
						<li ref={ref} className="timeline-heading text-center animate-box">
							<div><h3>Education</h3></div>
						</li>
						<li className="timeline-inverted animate-box">
							<div className="timeline-badge"><i><FontAwesomeIcon  icon='graduation-cap'/></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h3 className="timeline-title">Masters Degree</h3>
									<span className="company">University Name - 2007 - 2009</span>
								</div>
								<div className="timeline-body">
									<p>Far far away, behind the word mountains, they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
								</div>
							</div>
						</li>
						<li className="animate-box timeline-unverted">
							<div className="timeline-badge"><i><FontAwesomeIcon  icon='graduation-cap'/></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h3 className="timeline-title">Bachelors Degree</h3>
									<span className="company">University Name - 2002 - 2006</span>
								</div>
								<div className="timeline-body">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>
						</li>
						<li className="timeline-inverted animate-box">
							<div className="timeline-badge"><i><FontAwesomeIcon  icon='graduation-cap'/></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h3 className="timeline-title">Diploma Course</h3>
									<span className="company">College Name - 1999 - 2001</span>
								</div>
								<div className="timeline-body">
									<p>Far far away, behind the word mountains, they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
								</div>
							</div>
						</li>
						<li className="animate-box timeline-unverted">
							<div className="timeline-badge"><i><FontAwesomeIcon  icon='graduation-cap'/></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h3 className="timeline-title">Graduation</h3>
									<span className="company">College Name - 1994 - 1998</span>
								</div>
								<div className="timeline-body">
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
								</div>
							</div>
						</li>
			    	</ul>
				</Col>
			</Row>
		</Container>
	</div>
    )
};

export default Resume;