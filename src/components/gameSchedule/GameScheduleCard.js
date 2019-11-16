import React from 'react';
import { connect } from 'react-redux';

import AddGameSchedule from './AddGameSchedule';
import { GameScheduleDisplayCard } from './GameScheduleDisplayCard';

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

    onClickDetails = () => {
        this.props.history.push('/gameDetails');
    }

    onCancel = () => {
        this.setState({buttonClicked: false});
    }

    render() {
        const { gameId, guestTeam, score, guestScore, location, gameDate, rawDateString } = this.props;
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
                        <GameScheduleDisplayCard 
                            mygameId={gameId}
                            guestTeam={guestTeam}
                            score={score}
                            guestScore={guestScore}
                            location={location}
                            gameDate={gameDate}
                            rawDateString={rawDateString}
                            onClickEdit={this.onClickEdit}
                            onClickDelete={this.onClickDelete}
                        />
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