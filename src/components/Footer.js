import React, { Fragment } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../css/Footer.module.css";
import NavLink from "react-bootstrap/NavLink";
import svg from '../assets/images/content_struct.svg';
import { faFacebook, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = (props) => {

    // const handleSelection = (e) => {
    //     e.preventDefault();
    //     document.getElementById("fh5co-work").scrollIntoView({
    //          behavior:"smooth",
    //          block: "start"
    //     });
    // }
    return (
        <Fragment>
            <div className={styles.footer}>
                <Container>
                    <Row>
                        <Col md="3">
                            <div>Shortcuts</div>
                            <ListGroup className={styles.shortcuts}>
                                <ListGroupItem variant="primary">
                                    <NavLink  href="#fh5co-about">
                                        About me
                                    </NavLink>
                                </ListGroupItem> 
                                <ListGroupItem variant="primary">
                                    <NavLink  href="#fh5co-resume">
                                        My Resume
                                    </NavLink>
                                </ListGroupItem>
                                <ListGroupItem variant="primary">
                                    <NavLink  href="#fh5co-features">
                                        My Services
                                    </NavLink>
                                </ListGroupItem>
                                <ListGroupItem variant="primary">
                                    <NavLink  href="#fh5co-skills">
                                        My Skills
                                    </NavLink>
                                </ListGroupItem>
                                <ListGroupItem variant="primary">
                                    <NavLink  href="#fh5co-work" >
                                        My Projects
                                    </NavLink>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md="3">
                            <div>Find me on social media</div>
                            <ListGroup className={styles.shortcuts}>
                                <ListGroupItem variant="primary">
                                    <span><NavLink href="https://www.facebook.com/dimitar.palyov" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> @dimitar.palyov</NavLink></span>
                                </ListGroupItem> 
                                <ListGroupItem variant="primary">
                                    <span><NavLink href="https://www.instagram.com/dpalyov/"  target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> @dpalyov</NavLink></span>
                                </ListGroupItem>
                                <ListGroupItem variant="primary">
                                    <span><NavLink href="https://www.linkedin.com/in/dimitar-palyov-42741798/" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /> @dimitar-palyov-42741798</NavLink></span>
                                </ListGroupItem>
                                <ListGroupItem variant="primary">
                                     <span><NavLink href="https://www.github.com/dpalyov/"  target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> @dpalyov</NavLink></span>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <div className={styles.footerImg} style={{backgroundImage: `url(${svg})`}}>
                                &nbsp;
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default Footer;
