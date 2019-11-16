import React from 'react';
import NavBar from '../NavBar';
const axios = require('axios');

import { Form, Col, Button, Dropdown } from 'react-bootstrap';

const statsList = ['PTS','FGM','FGA','3PM','3PA','FTM','FTA','AST','DREB','OREB','REB','BLK','STL','TOV','FOUL'];

export class GameDetailsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestTeam:'',
            gameDate:'',
            players: [],
            records: [{
                id: 0,
                playerId: '',
                playerNum: '',
                stats: Array(statsList.length).fill(0)
            }]
        }
    }

    componentDidMount = () => {
        console.log('[GameDetailsSection]: params', this.props.match.params);
        const guestTeam = this.props.match.params.guestTeam;
        const gameDate = this.props.match.params.gameDate;

        // fetch all players' id and names 
        axios.defaults.headers.Authorization = 'Bearer ' + sessionStorage.getItem('jwtToken');
        const url = 'http://localhost:8080/api/profile';
        axios.get(url)
            .then((response) => {
                const data = response.data;
                console.log('[GameDetailsSection] Players: ', data);

                const players = data.map((player) => {
                    const {id, firstName, lastName, playerNumber} = player;
                    const name = firstName + ' ' + lastName;
                    return  {playerId: id, playerName: name, playerNumber}; 
                });
                console.log('[GameDetailsSection] New Players: ', players);
                this.setState({players: players, guestTeam, gameDate});
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

    onSubmit = () => {
        // build request data
        const { gameDate, guestTeam, records } = this.state;
        const requestStatsArr = records.map((record) => {
            const stats = record.stats;
            return {
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
    }

    render() {
        const { gameId } = this.props;
        const { records, players } = this.state;


        return (
            <div>
                <NavBar />
                <div style={{ margin:"30px 30px" }}>


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

                </div>
            </div>
            
        );
    }
}