import React from 'react';

import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export class PlayerSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            players:[{
                id:1,
                firstName: 'Zini',
                lastName: 'Zhu',
                playerNumber: 10,
                position: 'PG/SG',
                dateOfBirthday: '1996/08/25'
            }]
        }
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