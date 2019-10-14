import React from 'react';
import { Header } from './Header';
import GameSchedules from './gameSchedule/GameSchedules';

import { Col, Row } from 'react-bootstrap';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div>
                <Row>
                    <Header /> 
                </Row>
                <Row>
                    <Col>
                        <GameSchedules />   
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                
                
            </div>
        );
    }
}