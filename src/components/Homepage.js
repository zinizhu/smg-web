import React from 'react';
import { Header } from './Header';
import GameSchedules from './gameSchedule/GameSchedules';
import { TrainingPlanSection } from './trainingPlan/TrainingPlanSection';
import { TrainingPlanNavCard } from './trainingPlan/TrainingPlanNavCard';
import  GameSchedulesNavBar  from './gameSchedule/GameSchedulesNavBar';

import { Col, Row } from 'react-bootstrap';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div>
                <Header /> 
                <GameSchedulesNavBar />
                <Row>
                    <Col xs={9}>
                         something
                    </Col>
                    <Col xs={3}>
                        <TrainingPlanNavCard />
                    </Col>
                </Row>
                
                
            </div>
        );
    }
}

// <GameSchedules />   
// <TrainingPlanSection />