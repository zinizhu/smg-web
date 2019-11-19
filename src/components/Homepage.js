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
        const jwtToken = sessionStorage.getItem('jwtToken');
        return (
            <div>
                <Header /> 
                <div style={{ margin:"auto 100pxf" }}>
                    {jwtToken ?  (
                        <React.Fragment>
                        <GameSchedulesNavBar />
                        <Row>
                            <Col xs={9}>
                                something
                            </Col>
                            <Col xs={3}>
                                <TrainingPlanNavCard />
                            </Col>
                        </Row>
                        </React.Fragment>
                    ): (
                        <div style={{marginBottom: "200px", textAlign:"center"}}>
                            <h3>Welcome to SMG Official Website</h3>
                        </div>
                    )
                }
                </div> 
            </div>
        );
    }
}
