import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import AddGameSchedule from './AddGameSchedule';
import { Button } from 'react-bootstrap';
import { deleteGameScheduleById, setGameSchedules } from '../../actions/gameSchedules';


class GameScheduleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestTeam: '',
            score: 0,
            guestScore: 0,
            location: '',
            gameDate:'',
            buttonClicked: false
        }
    }

    componentDidMount = () => {
        this.setState({ ...this.props });
    }

    onClickEdit = () => {
        this.setState({buttonClicked: true});
    }

    onClickDelete = () => {
        const { dispatch, gameId, gameSchedules, removeSchedule, history } = this.props;
        dispatch(deleteGameScheduleById(gameId));
        const schedule = gameSchedules.filter((s) => {
            console.log('id:', gameId);
            console.log(s.gameId !== gameId);
            return s.gameId !== gameId;
        });
        console.log(schedule);
        dispatch(setGameSchedules(schedule));
    }

    onCancel = () => {
        this.setState({buttonClicked: false});
    }

    render() {
        const { gameId, guestTeam, score, guestScore, location, gameDate } = this.props;
        const { buttonClicked } = this.state;
        console.log('[Inside GameScheduleCard]', guestTeam, score, guestScore, location, gameDate);
        return (
            <div>
                {
                    buttonClicked ? (
                        <AddGameSchedule 
                            gameId={gameId}
                            guestTeam={guestTeam}
                            score={score}
                            guestScore={guestScore}
                            location={location}
                            gameDate={gameDate}
                            isEdit={true}
                            onCancel={this.onCancel}
                        />
                    ) : (
                        <React.Fragment>
                            <p>guestTeam: {guestTeam}</p>
                            <p>score: {score}</p>
                            <p>guestScore: {guestScore}</p>
                            <p>location: {location}</p>
                            <p>Date: {gameDate.toLocaleString()}</p>
                            <button onClick={this.onClickEdit}>Edit</button>
                            <button onClick={this.onClickDelete}>Delete</button>
                        </React.Fragment>
                        )
                }
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameSchedules: state.gameSchedules.gameSchedules
    }
}
   
export default connect(mapStateToProps)(GameScheduleCard);