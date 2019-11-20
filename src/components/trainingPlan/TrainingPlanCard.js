import React from 'react';

export class TrainingPlanCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            trainingPlans:[],
            date:'',
            summary:'',
            buttonClicked: false
        }
    }

    render() {
        const { id, trainingPlans, date, summary  } = this.props;
        const dateObject = new Date(date);

        const dateString = dateObject.getFullYear() + '/' + (dateObject.getMonth()+1) + '/' + dateObject.getDate();
        const minute = dateObject.getMinutes();
        const hour = dateObject.getHours();
        const updatedMinute = minute < 10 ? '0' + minute : minute;
        const updatedHour = hour < 10 ? '0' + hour : hour;
        const time = updatedHour + ':' + updatedMinute;
        
        return (
            <div style={{ margin:"10px auto", padding:"10px 10px", borderStyle:"solid", borderColor:"#bdbdbd" }}>
                <h5>Date: {dateString}</h5>
                <p>Date: {time}</p>
                <h5>Plans:</h5>
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
            </div>
        );
    }
}
