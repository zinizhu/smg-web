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

    

    // onClickEdit = () => {
    //     this.setState({buttonClicked: true});
    // }

    // onClickDelete = () => {
    //     const { dispatch, gameId, gameSchedules, removeSchedule, history } = this.props;
    //     dispatch(deleteGameScheduleById(gameId));
    //     const schedule = gameSchedules.filter((s) => {
    //         console.log('id:', gameId);
    //         console.log(s.gameId !== gameId);
    //         return s.gameId !== gameId;
    //     });
    //     console.log(schedule);m
    //     dispatch(setGameSchedules(schedule));
    // }

    // onCancel = () => {
    //     this.setState({buttonClicked: false});
    // }

    render() {
        const { id, trainingPlans, date, summary  } = this.props;
        console.log('Init date', date.split('-'));
        let dateArr = date.split(/[- T : .]/);

        dateArr = dateArr.slice(0,6);
        console.log('dateArr', dateArr);
        const dateString = dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2];
        
        return (
            <div>
                
                        <React.Fragment>
                            <h4>Date: {dateString}</h4>
                            <h4>Plans:</h4>
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
                        </React.Fragment>

                </div>
        );
    }
}
