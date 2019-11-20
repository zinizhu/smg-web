import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import { GameScheduleNavCard } from './GameScheduleNavCard';
import { fetchGameSchedules } from '../../actions/gameSchedules';


class GameSchedulesNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameSchedules: []
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGameSchedules());
        this.setState({ gameSchedules: this.props.gameSchedules });
    }

    render() {
        const { gameSchedules } = this.props;
        console.log('original schedules:', gameSchedules);
        const gameToDisplay = gameSchedules.slice(0, 3);

        return (
           <div style={{ margin: "30px 60px" }}>
                <Row>
                    <h3>Game Schedules</h3>
                </Row>
                <Row>
                    {
                        gameToDisplay.map((game, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <Col>
                                        <GameScheduleNavCard game={game} />
                                    </Col>
                                </React.Fragment>
                            );
                        })
                    }
                </Row>
           </div>
        );
    }
   
  }

const mapStateToProps = (state) => {
    return {
        gameSchedules: state.gameSchedules.gameSchedules
    }
}

export default connect(mapStateToProps)(GameSchedulesNavBar);