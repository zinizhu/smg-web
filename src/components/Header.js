import React from 'react';
import { Link } from 'react-router-dom';

import { Row } from 'react-bootstrap';

export class Header extends React.Component {
    render() {
        return (
            <div style={{marginLeft: "30px"}}>
                <Row>
                    <h3>SMG Official Website</h3>
                </Row>   
                <Row>
                    <Link to="/stats">Stats</Link>
                </Row>
            </div>
        );
    }
}