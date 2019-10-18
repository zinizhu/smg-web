import React from 'react';
const axios = require('axios');

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
        let dateArr = date.split(/[- T : .]/);

        dateArr = dateArr.slice(0,6);
        const dateString = dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2];
        
        return (
            <div style={{borderStyle:" solid", borderRadius:"3px", width:"300px", display:"block", margin:"20px auto", padding:"20px"}}>
                <h3>Training Plan</h3>
                <h5>Date: {dateString}</h5>
                <h5>Plans:</h5>
                {
                    trainingPlans && trainingPlans.length !== 0 &&
                    trainingPlans.map((plan, idx) => {
                        return (
                            <React.Fragment>
                                <div  key={idx}>
                                    <li>{plan}</li>
                                </div>
                            </React.Fragment>
                        );
                    })
                }
            </div>
        );
    }
}
