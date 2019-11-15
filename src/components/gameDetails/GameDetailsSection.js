import React from 'react';
import NavBar from '../NavBar';

import { Form, Col, Button } from 'react-bootstrap';

// <th>PTS</th>
// <th>FGM</th>
// <th>FGA</th>
// <th>FG%</th>
// <th>3PM</th>
// <th>3PA</th>
// <th>3P%</th>
// <th>FTM</th>
// <th>FTA</th>
// <th>FT%</th>
// <th>AST</th>
// <th>DREB</th>
// <th>OREB</th>
// <th>REB</th>
// <th>BLK</th>
// <th>STL</th>
// <th>TOV</th>
// <th>FOUL</th>

const statsList = ['PTS','FGM','FGA','3PM','3PA','FTM','FTA','AST','DREB','OREB','REB','BLK','STL','TOV','FOUL'];

export class GameDetailsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [{
                id: 0,
                playerId: '',
                playerNum: '',
                stats: Array(statsList.length).fill(0)
            }]
        }
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
                record.stats[statsId] = value;
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

    render() {
        const { gameId } = this.props;
        const { records } = this.state;


        return (
            <div>
                <NavBar />
                <div style={{ margin:"30px 30px" }}>


                    <div style={{ margin:"10px auto", padding:"10px 10px", borderStyle:"solid", borderColor:"#bdbdbd", borderWidth:"thick", borderRadius:"8px" }}>
                        <h3>Add Game Stats</h3>
                        <Form>
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
                                    return (
                                        <Form.Row key={recordId}>
                                            <Form.Group as={Col} controlId="playerName">
                                                <Form.Control placeholder="" onChange={this.onInputChange} controlId={recordId}/>
                                            </Form.Group>
                                            {
                                                statsList.map((name, statsId) => {
                                                    const boxId = recordId + '_' + statsId;
                                                    return (
                                                        <React.Fragment>
                                                            <Form.Group as={Col} controlId={boxId}>
                                                                <Form.Control placeholder="" onChange={this.onInputChange} value={record.stats[statsId]}/>
                                                            </Form.Group>
                                                        </React.Fragment>
                                                    );
                                                })
                                            }
                                            
                                            <Form.Group as={Col}>
                                                <Button variant="primary" type="button" onClick={this.onAddNewItem} style={{ marginRight: "5px" }}>
                                                    +
                                                </Button>
                                                <Button variant="primary" type="button" onClick={this.onDeleteItem} id={recordId}>
                                                    -
                                                </Button>
                                            </Form.Group>
                                        </Form.Row>
                                    );
                                })
                            }
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </Form>
                    </div>

                </div>
            </div>
            
        );
    }
}