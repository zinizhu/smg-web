import React from 'react';
import { Header } from './Header';
import GameSchedules from './gameSchedule/GameSchedules';
import { TrainingPlanSection } from './trainingPlan/TrainingPlanSection';

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
                    <Col xs={6}>
                        <GameSchedules />   
                    </Col>
                    <Col xs={6}>
                        <TrainingPlanSection />
                    </Col>
                </Row>
                
                
            </div>
        );
    }
}