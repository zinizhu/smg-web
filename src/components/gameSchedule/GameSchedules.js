import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GameScheduleCard from './GameScheduleCard';
import { fetchGameSchedules } from '../../actions/gameSchedules';
import AddGameSchedule from './AddGameSchedule';
import NavBar from '../NavBar';

import {  Col, Row, Button } from 'react-bootstrap';

class GameSchedules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterGuest: '',
            gameSchedules: []
        };
    }

    componentDidMount() {
        const jwtToken = sessionStorage.getItem('jwtToken');
        const role = sessionStorage.getItem('userRole');
        console.log('[GameSchedule] jwtToken', jwtToken);
        if (jwtToken === null || role === null) {
            this.props.history.push('/login');
        }

        const { dispatch } = this.props;
        dispatch(fetchGameSchedules());
    }

    removeSchedule = () => {
        window.location.reload();
    }

    render() {
        const { gameSchedules } = this.props;
        console.log('gameSchedules', gameSchedules);
        const role = sessionStorage.getItem('userRole');

        return (
            <React.Fragment>
                <NavBar/>
                <div style={{ margin:"30px 30px" }}>
                <h3>Game Schedules</h3>
                <Row>
                {
                    
                        gameSchedules && gameSchedules.length !== 0 && 
                        gameSchedules.map((schedule, idx) => {
                            const { gameId, guestTeam, score, guestScore, location, gameDate, rawDateString } = schedule;
                            console.log("Inside div, schedule: ", schedule);
                            return (
                                <Col xs={4} key={idx}>
                                    <GameScheduleCard 
                                        key={idx}
                                        gameId={gameId}
                                        guestTeam={guestTeam}
                                        score={score}
                                        guestScore={guestScore}
                                        location={location}
                                        gameDate={gameDate}
                                        rawDateString={rawDateString}
                                        removeSchedule={this.removeSchedule}
                                    />
                                </Col>
                            );
                        })
                    
                }
                </Row>
                { role === 'ROLE_COACH' &&
                <Row>
                    <Col xs={6}>
                        <AddGameSchedule />
                    </Col>
                </Row>
                }
                <Row style={{marginTop: "20px"}}>
                    <Col>
                        <Link style={{color:"#79a6d2"}} to='/'>Go Back</Link>
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