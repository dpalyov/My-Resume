import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = props => {

    return (
        <Fragment>
            <div id="fh5co-footer">
                <Container>
                    <Row>
                        <Col md="12">
					        <p>&copy; 2019 Dimitar Palyov. All rights reserved</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="gototop js-top">
                <a href="/" className="js-gotop"><i><FontAwesomeIcon icon="arrow-up" /></i></a>
            </div>
        </Fragment>
    )
}

export default Footer;