import React from 'react';

import { Table } from 'react-bootstrap';

export class TeamSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            rank: 1,
            win: 0,
            lose: 0,
            PPG: 0.0,
            LPG: 0.0
        }
    }

    render() {
        const {rank, win, lose, PPG, LPG} = this.state;

        return (
            <div>
                <h3>Team Summary</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Record</th>
                            <th>PPG</th>
                            <th>LPG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{rank}</td>
                            <td>{win}-{win+lose}</td>
                            <td>{PPG}</td>
                            <td>{LPG}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        );
    }
}