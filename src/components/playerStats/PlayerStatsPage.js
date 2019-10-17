import React from 'react';
const axios = require('axios');
import { Table, Row } from 'react-bootstrap';

import { StatsGraph } from './StatsGraph';

// const mock = {
//     playerId: 1,
//     playerNumber: '10',
//     name: 'Zini Zhu',
//     position: 'SG/PG',
//     dateOfBirth: '1996/08/25',
//     average: {
//         "assist": 4,
//         "block":2,
//         "defensiveRebound": 4,
//         "offensiveRebound": 1,
//         "foul": 3,
//         "point": 10,
//         "fieldAttempt": 10,
//         "fieldMade": 3,
//         "threeAttempt": 2,
//         "threeMade":1,
//         "turnover":1,
//         "steal":6,
//         "freeThrowAttempt": 6,
//         "freeThrowMade": 3
//     },
//     games: [{
//         "guestTeam":"Ace",
//         "gameDate": "2019-10-14",
//         "assist": 4,
//         "block":2,
//         "defensiveRebound": 4,
//         "offensiveRebound": 1,
//         "foul": 3,
//         "point": 10,
//         "fieldAttempt": 10,
//         "fieldMade": 3,
//         "threeAttempt": 2,
//         "threeMade":1,
//         "turnover":1,
//         "steal":6,
//         "freeThrowAttempt": 6,
//         "freeThrowMade": 3
//     },{
//         "guestTeam":"Blue Whale",
//         "gameDate": "2019-9-14",
//         "assist": 5,
//         "block":0,
//         "defensiveRebound": 6,
//         "offensiveRebound": 2,
//         "foul": 2,
//         "point": 8,
//         "fieldAttempt": 6,
//         "fieldMade": 3,
//         "threeAttempt": 1,
//         "threeMade":0,
//         "turnover":2,
//         "steal":2,
//         "freeThrowAttempt": 4,
//         "freeThrowMade": 2
//     }]
// }

export class PlayerStatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: 0,
            playerNumber: '-',
            name: '',
            position: '',
            dateOfBirth: '',
            average: {},
            games: []
        }
        //this.state = mock;
    }

    componentDidMount() {
        // retrieve player stats
        const playerId = this.props.match.params.id;
        const url = `http://localhost:8080/api/playerStats/playerId/${playerId}`;
        axios.get(url)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({...data});
            })
            .catch((e) => {
                console.log('Fail to fetch player stats. (id = ', playerId, ')');
                console.log(e);
            })
    }

    preparePointGraphData = () => {
        const games = this.state.games;
        const xData = [...Array(games.length).keys()];
        const yData = games.map((game) => game.point);
        //const average = this.state.average.point;
        var average = new Array(games.length);
        average = average.fill(this.state.average.point);
        const yTitle = "PTS";
        const name = "";

        return (
            <StatsGraph
                xData={xData}
                yData={yData}
                average={average}
                yTitle={yTitle}
                name={name}
            />
        );
    }

    preparePCTGraphData = () => {
        const games = this.state.games;
        const xData = [...Array(games.length).keys()];
        const yData = games.map((game) => {
            const { fieldAttempt, fieldMade } = game;
            return fieldAttempt === 0 ? '-' : (fieldMade/fieldAttempt).toFixed(1);
        });
        const average = this.state.average;
        var averagePCTArr = new Array(games.length);
        const averagePCT = average.fieldAttempt === 0 ? 0 : (average.fieldMade/average.fieldAttempt).toFixed(1);
        averagePCTArr = averagePCTArr.fill(averagePCT);
        const yTitle = "Percentage";
        const name = "";

        return (
            <StatsGraph
                xData={xData}
                yData={yData}
                average={averagePCTArr}
                yTitle={yTitle}
                name={name}
            />
        );
    }

    prepareAssistGraphData = () => {
        const games = this.state.games;
        const xData = [...Array(games.length).keys()];
        const yData = games.map((game) => game.assist);
        //const average = this.state.average.point;
        var average = new Array(games.length);
        average = average.fill(this.state.average.assist);
        const yTitle = "AST";
        const name = "";

        return (
            <StatsGraph
                xData={xData}
                yData={yData}
                average={average}
                yTitle={yTitle}
                name={name}
            />
        );
    }

    render() {
        const { playerNumber, name, position, dateOfBirth, average, games } = this.state;
        const rebound = average.defensiveRebound + average.offensiveRebound;
        const dateOfBirthObj = new Date(dateOfBirth);
        const dateString = dateOfBirthObj.getUTCFullYear() + '/' + dateOfBirthObj.getMonth() + '/' + dateOfBirthObj.getDate();
        return (
            <div>
                <h3>{name}</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Position</th>
                            <th>dateOfBirth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{playerNumber}</td>
                            <td>{position}</td>
                            <td>{dateString}</td>
                        </tr>
                    </tbody>
                </Table>

                <h3>Average Stats</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>PTS</th>
                            <th>AST</th>
                            <th>REB</th>
                            <th>STL</th>
                            <th>BLK</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{average.point}</td>
                            <td>{average.assist}</td>
                            <td>{rebound}</td>
                            <td>{average.steal}</td>
                            <td>{average.block}</td>
                        </tr>
                    </tbody>
                </Table>

                <h3>Games Stats</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Guest Team</th>
                            <th>PTS</th>
                            <th>FGM</th>
                            <th>FGA</th>
                            <th>FG%</th>
                            <th>3PM</th>
                            <th>3PA</th>
                            <th>3P%</th>
                            <th>FTM</th>
                            <th>FTA</th>
                            <th>FT%</th>
                            <th>AST</th>
                            <th>DREB</th>
                            <th>OREB</th>
                            <th>REB</th>
                            <th>BLK</th>
                            <th>STL</th>
                            <th>TOV</th>
                            <th>FOUL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            games.map((game, idx) => {
                                const { guestTeam, gameDate, assist, block, defensiveRebound, offensiveRebound, foul, point, fieldAttempt, fieldMade, threeAttempt, threeMade, turnover, steal, freeThrowAttempt, freeThrowMade } = game;
                                const dateObj = new Date(gameDate);
                                const year = dateObj.getFullYear();
                                const month = dateObj.getMonth();
                                const date = dateObj.getDate();
                                const dateString = year+'/'+month+'/'+date;
                                const freeThrowPercentage = freeThrowAttempt === 0 ? '-' : (freeThrowMade/freeThrowAttempt).toFixed(1);
                                const fieldGoalPercentage = fieldAttempt === 0 ? '-' : (fieldMade/fieldAttempt).toFixed(1);
                                const threePercentage = threeAttempt === 0 ? '-' : (threeMade/threeAttempt).toFixed(1);
                                const rebound = defensiveRebound + offensiveRebound;
                                return (
                                    <React.Fragment key={idx}>
                                        <tr>
                                            <td>{dateString}</td>
                                            <td>{guestTeam}</td>
                                            <td>{point}</td>
                                            <td>{fieldMade}</td>
                                            <td>{fieldAttempt}</td>
                                            <td>{fieldGoalPercentage}</td>
                                            <td>{threeMade}</td>
                                            <td>{threeAttempt}</td>
                                            <td>{threePercentage}</td>
                                            <td>{freeThrowMade}</td>
                                            <td>{freeThrowAttempt}</td>
                                            <td>{freeThrowPercentage}</td>
                                            <td>{assist}</td>
                                            <td>{defensiveRebound}</td>
                                            <td>{offensiveRebound}</td>
                                            <td>{rebound}</td>
                                            <td>{block}</td>
                                            <td>{steal}</td>
                                            <td>{turnover}</td>
                                            <td>{foul}</td>
                                        </tr>
                                    </React.Fragment>
                                );
                                
                            })
                        }
                    </tbody>
                </Table>

                <h3>Graphs</h3>
                <Row>
                {
                    this.preparePointGraphData()
                }
                {
                    this.prepareAssistGraphData()
                }
                {
                    this.preparePCTGraphData()
                }
                </Row>
            </div>
        );
    }
}

// const mapStateToProps = (state, props) => {
//     return {
//         gameSchedules: state.gameSchedules.gameSchedules
//     }
// }
   
// export default connect(mapStateToProps)(GameScheduleCard);