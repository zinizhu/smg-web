import React from 'react';
import { connect } from 'react-redux';

import GameScheduleCard from './GameScheduleCard';
import { fetchGameSchedules } from '../../actions/gameSchedules';
import AddGameSchedule from './AddGameSchedule';
import { NavBar } from '../NavBar';

import {  Col, Row } from 'react-bootstrap';

class GameSchedules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterGuest: '',
            gameSchedules: []
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGameSchedules());
    }

    removeSchedule = () => {
        window.location.reload();
    }

    render() {
        const { gameSchedules } = this.props;
        console.log('gameSchedules', gameSchedules);

        return (
            <React.Fragment>
                <NavBar/>
                <div style={{ margin:"30px 30px" }}>
                <h3>Game Schedules</h3>
                <Row>
                {
                    
                        gameSchedules && gameSchedules.length !== 0 && 
                        gameSchedules.map((schedule, idx) => {
                            const { gameId, guestTeam, score, guestScore, location, gameDate } = schedule;
                            console.log("Inside div, schedule: ", schedule);
                            return (
                                <Col>
                                    <GameScheduleCard 
                                        key={idx}
                                        gameId={gameId}
                                        guestTeam={guestTeam}
                                        score={score}
                                        guestScore={guestScore}
                                        location={location}
                                        gameDate={gameDate}
                                        removeSchedule={this.removeSchedule}
                                    />
                                </Col>
                            );
                        })
                    
                }
                </Row>
                <Row>
                    <Col xs={6}>
                        <AddGameSchedule />
                    </Col>
                </Row>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameSchedules: state.gameSchedules.gameSchedules
    }
}

export default connect(mapStateToProps)(GameSchedules);