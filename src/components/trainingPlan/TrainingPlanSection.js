import React from 'react';
const axios = require('axios');

import { NavBar } from '../NavBar';
import { TrainingPlanCard } from './TrainingPlanCard';
import { AddTrainingPlan } from './AddTrainingPlan';

export class TrainingPlanSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            plans: []
        }
    }

    componentDidMount = () => {
        const url = 'http://localhost:8080/api/trainingPlan';
        
        axios.get(url)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({plans: data});
            })
            .catch((e) => {
                console.log(e);
            })
    }

    render() {
        const { plans } = this.state;

        return (
            <React.Fragment>
                <NavBar />
                <div style={{ margin:"30px 30px" }}>
                    <h3>Game Schedules</h3>
                    {
                        plans && plans.length !== 0 && 
                        plans.map((plan, idx) => {
                            const { id, trainingPlans, summary, date } = plan;
                            return (
                                <TrainingPlanCard
                                    key={idx}
                                    id={id}
                                    trainingPlans={trainingPlans}
                                    summary={summary}
                                    date={date}
                                />
                            );
                        })
                    }
                    <AddTrainingPlan />
                </div>
            </React.Fragment>
        );
    }
}