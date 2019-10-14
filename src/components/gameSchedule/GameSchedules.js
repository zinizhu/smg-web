import React from 'react';
import { connect } from 'react-redux';

import GameScheduleCard from './GameScheduleCard';
import { fetchGameSchedules } from '../../actions/gameSchedules';
import AddGameSchedule from './AddGameSchedule';

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
        const gameSchedules = dispatch(fetchGameSchedules());
        this.setState({ gameSchedules });
        console.log('original schedules:', gameSchedules);
    }

    removeSchedule = () => {
        console.log('this is', this);
        //this.forceUpdate();
        window.location.reload();
    }

    render() {
        const { gameSchedules } = this.props;
        console.log('gameSchedules', gameSchedules);

        return (
            <React.Fragment>
                <h3>Game Schedules</h3>
                {
                    gameSchedules && gameSchedules.length !== 0 && 
                    gameSchedules.map((schedule, idx) => {
                        const { gameId, guestTeam, score, guestScore, location, gameDate } = schedule;
                        console.log("Inside div, schedule: ", schedule);
                        return (
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
                        );
                    })
                }
                <AddGameSchedule />
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