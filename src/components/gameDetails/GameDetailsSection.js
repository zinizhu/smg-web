import React from 'react';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';
const axios = require('axios');

import { Form, Col, Button, Dropdown, Table } from 'react-bootstrap';

const statsList = ['PTS','FGM','FGA','3PM','3PA','FTM','FTA','AST','DREB','OREB','REB','BLK','STL','TOV','FOUL'];

export class GameDetailsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestTeam:'',
            gameId:'',
            gameDate: '',
            players: [],
            records: [{
                id: 0,
                playerId: '',
                playerNum: '',
                stats: Array(statsList.length).fill(0)
            }],
            storedStats:[]
        }
    }

    componentDidMount = () => {
        console.log('[GameDetailsSection]: params', this.props.match.params);
        const guestTeam = this.props.match.params.guestTeam;
        const gameId = this.props.match.params.gameId;
        const gameDate = this.props.match.params.gameDate;
        axios.defaults.headers.Authorization = 'Bearer ' + sessionStorage.getItem('jwtToken');

        // fetch exist stats
        const statsUrl = 'http://localhost:8080/api/playerStats/gameId/' + gameId;
        
        // fetch all players' id and names 
        
        const playerUrl = 'http://localhost:8080/api/profile';
        axios.get(playerUrl)
            .then((response) => {
                const data = response.data;
                console.log('[GameDetailsSection] Players: ', data);

                const players = data.map((player) => {
                    const {id, firstName, lastName, playerNumber} = player;
                    const name = firstName + ' ' + lastName;
                    return  {playerId: id, playerName: name, playerNumber}; 
                });
                console.log('[GameDetailsSection] New Players: ', players);
                this.setState({players: players, guestTeam, gameId, gameDate});
            })
            .then(() => {
                axios.get(statsUrl)
                .then((response) => {
                    const data = response.data;
                    console.log('[GameDetailsSection] Stats: ', data);
                    this.setState({storedStats: data});
                })
                
                .catch((e) => {
                    console.log(e);
                }) 
            })
            .catch((e) => {
                console.log(e);
            })  
    }

    isNumeric = (value) => {
        return /^-{0,1}\d+$/.test(value);
    }

    onInputChange = (e) => {
        //TODO: limit to number
        const value = e.target.value;
        const record_stats_id = e.target.id;

        console.log('[OnInputChange]: selected id: ', record_stats_id);
        const records = this.state.records;
        console.log('[OnInputChange]: current records: ', records);

        // separate ids
        const ids = record_stats_id.split('_');
        const recordId = parseInt(ids[0]);
        const statsId = parseInt(ids[1]);

        console.log('[OnInputChange] recordId:', recordId);
        console.log('[OnInputChange] statsId:', statsId);

        const newRecords = records.map((record, idx) => {
            if (idx === recordId) {
                // parse value to integer
                console.log('[OnInputChange] record: ', record);
                if (value === '') {
                    record.stats[statsId] = 0;
                    return record;
                }
                if (!this.isNumeric(value)) {
                    alert('Please enter an integer.');
                    return record;
                }
                record.stats[statsId] = parseInt(value);
            }
            return record;
        });
        console.log('[OnInputChange] new records:', newRecords);
        this.setState({records: newRecords});
    }

    onDeleteItem = (e) => {
        const selectedRecordId = e.target.id;
        const records = this.state.records;
        console.log('[OnDeleteItem] deleted id:', selectedRecordId);
        console.log('[OnDeleteItem] records: ', records);
        if (records.length === 1) return;
        const recordsAfterDeletion = records.filter((record, idx) => {
            return idx !== parseInt(selectedRecordId);
        });
        const newRecords = recordsAfterDeletion.map((record, idx) => {
            record.id = idx;
            return record;
        });
        console.log('new records', newRecords);
        this.setState({records: newRecords});
    }

    onDateChange = (date) => {
        console.log('Date: ', date);
        this.setState({ date: date, dateSelected: false });
    };

    onFocus = () => {
        this.setState({dateSelected: true});
    }

    onAddNewItem = () => {
        var records = this.state.records;
        const length = records.length;
        records.push({
            id: length,
            playerId: '',
            playerNum: '',
            stats: Array(statsList.length).fill(0)
        });
        console.log('[OnAddNewItem] new records: ', records);
        this.setState({ records: records });
    }

    onSelectPlayer = (key, e) => { 
        const dropdownId = e.target.id;
        const playerName = e.target.text;
        console.log('[onSelectPlayer] dropdownId: ', dropdownId);
        console.log('[onSelectPlayer] playerName: ', playerName);

        // get playerId and recordId
        const recordId = dropdownId.split('-')[0];
        const playerId = dropdownId.split('-')[1];
        const toggleId = 'toggle-' + recordId;

        const players = this.state.players;
        const targetPlayer = players.filter((player) => {
            return player.playerId === parseInt(playerId);
        });
        const playerNumber =targetPlayer[0].playerNumber;

        // modify records
        var records = this.state.records;
        records[parseInt(recordId)].playerId = playerId;
        records[parseInt(recordId)].playerNum = playerNumber;
        console.log('[onSelectPlayer] updated records: ', records);
        this.setState({records: records});

        // modify html
        document.getElementById(toggleId).innerHTML = playerName;

    }

    onClickBack = () => {

    }

    onSubmit = () => {
        // build request data
        const { gameDate, guestTeam, records, gameId } = this.state;
        const requestStatsArr = records.map((record) => {
            const stats = record.stats;
            return {
                gameId,
                playerId: record.playerId,
                playerNumber: record.playerNum,
                guestTeam,
                gameDate,
                point: stats[0],
                fieldMade: stats[1],
                fieldAttempt: stats[2],
                threeMade: stats[3],
                threeAttempt: stats[4],
                freeThrowMade: stats[5],
                freeThrowAttempt: stats[6],
                assist: stats[7],
                defensiveRebound: stats[8],
                offensiveRebound: stats[9],
                block: stats[11],
                steal: stats[12],
                turnover: stats[13],
                foul: stats[14]
            }
        });
        const requestData = { playerStatsList: requestStatsArr };
        console.log('[OnSubmit] request data: ', requestData);
        const postUrl = 'http://localhost:8080/api/playerStats/list';

        axios.defaults.headers.Authorization = 'Bearer ' + sessionStorage.getItem('jwtToken');
        axios({
            method: 'post',
            data: requestData,
            url: postUrl
        })
        .then((res) => {
            console.log('[GameDetailsSection] New game stats uploaded.');
        })
        .catch((e) => {
            console.log('[GameDetailsSection] Error uploading game stats.');
        })

        window.location.reload(false);
    }

    onClickBack = () => {
        this.props.history.push('/gameSchedule');
    }

    render() {
        const { records, players, storedStats, guestTeam, gameDate } = this.state;
        const role = sessionStorage.getItem('userRole');
        console.log(role);
        return (
            <div>
                <NavBar />
                <div style={{ margin:"30px 30px" }}>
                <h3>{guestTeam}</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Player</th>
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
                        storedStats && storedStats.length !== 0 &&
                        storedStats.map((game, idx) => {
                            const { playerId, guestTeam, gameDate, assist, block, defensiveRebound, offensiveRebound, foul, point, fieldAttempt, fieldMade, threeAttempt, threeMade, turnover, steal, freeThrowAttempt, freeThrowMade } = game;
                                const dateObj = new Date(gameDate);
                                const year = dateObj.getFullYear();
                                const month = dateObj.getMonth();
                                const date = dateObj.getDate();
                                const dateString = year+'/'+month+'/'+date;
                                const freeThrowPercentage = freeThrowAttempt === 0 ? '-' : (freeThrowMade/freeThrowAttempt).toFixed(3);
                                const fieldGoalPercentage = fieldAttempt === 0 ? '-' : (fieldMade/fieldAttempt).toFixed(3);
                                const threePercentage = threeAttempt === 0 ? '-' : (threeMade/threeAttempt).toFixed(3);
                                const rebound = defensiveRebound + offensiveRebound;
                                // get player name
                                const selectedPlayer = players.filter((player) => {
                                    return player.playerId === playerId;
                                })

                                console.log("Selected player is: ", selectedPlayer);
                                const name = selectedPlayer[0].playerName;
                                return (
                                    <React.Fragment key={idx}>
                                        <tr>
                                            <td>{name}</td>
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
                { role === 'ROLE_COACH' && 
                    <div style={{ margin:"10px auto", padding:"10px 10px", borderStyle:"solid", borderColor:"#bdbdbd", borderWidth:"thick", borderRadius:"8px" }}>
                        <h3>Add Game Stats</h3>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Player</Form.Label>
                                    </Form.Group>
                                    {
                                        statsList.map((name) => {
                                            return (
                                                <React.Fragment>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>{name}</Form.Label>
                                                    </Form.Group>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                    <Form.Group as={Col}>
                                        <Form.Label>Add/Delete</Form.Label>
                                    </Form.Group>
                                </Form.Row>

                                {
                                    records && 
                                    records.map((record, recordId) => {
                                        const toggleId = 'toggle-' + recordId;
                                        return (
                                            <Form.Row key={recordId}>
                                                <Form.Group as={Col} controlId="playerName">
                                                    <Dropdown onSelect={this.onSelectPlayer}>
                                                        <Dropdown.Toggle variant="secondary" size="sm" id={toggleId}>
                                                            select a player
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            {
                                                                players && 
                                                                players.map((player, id) => {
                                                                    const toggleId = recordId + '-' + player.playerId;
                                                                    return (
                                                                        <React.Fragment>
                                                                            <Dropdown.Item key={id} id={toggleId}>{player.playerName}</Dropdown.Item>
                                                                        </React.Fragment>
                                                                    );
                                                                })
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Form.Group>
                                                {
                                                    statsList.map((name, statsId) => {
                                                        const boxId = recordId + '_' + statsId;
                                                        return (
                                                            <React.Fragment>
                                                                <Form.Group as={Col} controlId={boxId}>
                                                                    <Form.Control size="sm" placeholder="" onChange={this.onInputChange} value={record.stats[statsId]}/>
                                                                </Form.Group>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                                
                                                <Form.Group as={Col}>
                                                    <Button variant="primary" type="button" size="sm" onClick={this.onAddNewItem} style={{ marginRight: "5px" }}>
                                                        +
                                                    </Button>
                                                    <Button variant="primary" type="button" size="sm" onClick={this.onDeleteItem} id={recordId}>
                                                        -
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        );
                                    })
                                }
                                <Button variant="primary" onClick={this.onSubmit}>
                                    Add
                                </Button>
                            </Form>
                    </div>
                }            
                <Button variant="primary" onClick={this.onClickBack}>
                    Back
                </Button>
                </div>
            </div>
            
        );
    }
}