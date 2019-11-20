import React from 'react';
const axios = require('axios');

import { Card, Button } from 'react-bootstrap';

export class TrainingPlanNavCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: {
                id: 0,
                trainingPlans:[],
                date:''
            }
        }
    }

    componentDidMount = () => {
        const url = 'http://localhost:8080/api/trainingPlan';
        axios.defaults.headers.Authorization = 'Bearer ' + sessionStorage.getItem('jwtToken');
        axios.get(url)
            .then((response) => {
                const data = response.data;
                if (data.length !== 0) {
                    this.setState({plan: data[0]});
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    render() {
        const { trainingPlans, date  } = this.state.plan;
        const dateObject = new Date(date);

        const dateString = dateObject.getFullYear() + '/' + (dateObject.getMonth()+1) + '/' + dateObject.getDate();
        const minute = dateObject.getMinutes();
        const hour = dateObject.getHours();
        const updatedMinute = minute < 10 ? '0' + minute : minute;
        const updatedHour = hour < 10 ? '0' + hour : hour;
        const time = updatedHour + ':' + updatedMinute;
        
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                <Card.Header>Training Plan</Card.Header>
                <Card.Body>
                    <Card.Title>Time</Card.Title>
                    <Card.Text>
                        {dateString} {time}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                <Card.Title>Plan</Card.Title>
                {
                    trainingPlans && trainingPlans.length !== 0 &&
                    trainingPlans.map((plan, idx) => {
                        return (
                                <div  key={idx}>
                                    <li>{plan}</li>
                                </div>
                        );
                    })
                }
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </div>
        );
    }
}


// <h3>Training Plan</h3>
// <h5>Date: {dateString}</h5>
// <h5>Plans:</h5>
// {
//     trainingPlans && trainingPlans.length !== 0 &&
//     trainingPlans.map((plan, idx) => {
//         return (
//             <React.Fragment>
//                 <div  key={idx}>
//                     <li>{plan}</li>
//                 </div>
//             </React.Fragment>
//         );
//     })
// }