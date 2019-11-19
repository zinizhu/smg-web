import React from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';

import { Form, Col, Button } from 'react-bootstrap';
import { addOrUpdateNewGameSchedule } from '../../actions/gameSchedules';

import "react-datepicker/dist/react-datepicker.css";

class AddGameSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestTeam:'',
            location:'',
            gameDate: new Date(),
            score: 0,
            guestScore: 0,
            dateSelected: false,
            isEdit: false,
            ...this.props
        }
    }

    componentDidMount() {
        const gameDate = this.props.gameDate;
        if (gameDate === undefined) {
            const dateObj = new Date();
            const dateString = dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate();
            this.setState({ gameDate: dateString });
        }
        else {
            this.setState({ gameDate: gameDate[0] + '/' + gameDate[1] + '/' + gameDate[2] });
        }
    }

    onChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        let stateObject = this.state;
        stateObject[id] = value;
        this.setState({...stateObject});
    }

    onDateChange = (dateObj) => {
        console.log('selected date:', dateObj);
        console.log('month:', dateObj.getMonth());
        console.log('day:', dateObj.getDay());
        const dateString = dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate();
        this.setState({ gameDate: dateString, dateSelected: false });
    };

    onNumChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        console.log("value: ", value);
        var numVal = parseInt(value);

        if (isNaN(numVal)) {
            numVal = 0;
        }

        var object = this.state;
        object[id] = numVal;
        this.setState({...object});
    }

    onFocus = () => {
        this.setState({dateSelected: true});
    }

    onClickCancel = () => {
        const onCancel = this.props.onCancel;
        this.setState({isEdit: false});
        onCancel();
    }

    onSubmit = () => {
        const { dispatch } = this.props;
        const { guestTeam, location, gameDate, score, guestScore } = this.state;
        const gameId = this.props.gameId;
        const gameDateString = (new Date(gameDate)).toISOString();
        const data = { gameId, guestTeam, location, score, guestScore, gameDate:gameDateString };
        console.log('New game schedule:', data);
        dispatch(addOrUpdateNewGameSchedule(data));
    }

    render() {
        
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="guestTeam">
                            <Form.Label>Guest Team</Form.Label>
                            <Form.Control placeholder="Guest Team" onChange={this.onChange} value={this.state.guestTeam}/>
                        </Form.Group>
                    
                        <Form.Group as={Col} controlId="gameDate">
                            <Form.Label>Game Date</Form.Label>
                            <Form.Control placeholder="Guest Team" onChange={this.onChange} onFocus={this.onFocus} value={this.state.gameDate}/>
                            {
                                this.state.dateSelected && 
                                <Calendar   
                                    value={new Date()}
                                    onChange={this.onDateChange}
                                />
                            }
                        </Form.Group>

                        <Form.Group as={Col} controlId="score">
                            <Form.Label>Score</Form.Label>
                            <Form.Control placeholder="Score" onChange={this.onNumChange} value={this.state.score}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="guestScore">
                            <Form.Label>Guest Score</Form.Label>
                            <Form.Control placeholder="Guest Score" onChange={this.onNumChange} value={this.state.guestScore}/>
                        </Form.Group>
                    </Form.Row>
                
                    <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Foothill College" onChange={this.onChange} value={this.state.location}/>
                    </Form.Group>
                
                    <Button variant="primary" type="submit"  >
                        Add
                    </Button>
                    { this.state.isEdit && 
                        <Button variant="primary" onClick={this.onClickCancel}>
                            Cancel
                        </Button>
                    }
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameSchedules: state.gameSchedules.gameSchedules
    }
}

export default connect(mapStateToProps)(AddGameSchedule);

// variant="primary" type="submit" 
// onSubmit={this.onSubmit}
// onClick={this.onSubmit}
