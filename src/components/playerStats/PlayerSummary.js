import React from 'react';
const axios = require('axios');

import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export class PlayerSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            players:[]
        }
    }

    componentDidMount() {
        // retrieve player profiles
        const url = `http://localhost:8080/api/profile`;
        axios.get(url)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({players: data});
            })
            .catch((e) => {
                console.log('Fail to fetch player stats. (id = ', playerId, ')');
                console.log(e);
            })
    }

    render() {
        const { players } = this.state;

        return (
            <div>
                <h3>Player Summary</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Number</th>
                            <th>Position</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map((player, idx) => {
                                const playerIdPath = '/stats/' + player.id;
                                return (
                                        <tr key={idx}>
                                            <td><Link to={playerIdPath}>{player.firstName} {player.lastName}</Link></td>
                                            <td>{player.playerNumber}</td>
                                            <td>{player.position}</td>
                                            <td>{player.dateOfBirthday}</td>
                                        </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>

        );
    }
}