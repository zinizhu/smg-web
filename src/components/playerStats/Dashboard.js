import React from 'react';
import { TeamSummary } from './TeamSummary';
import { PlayerSummary } from './PlayerSummary';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <h3>Statistics</h3>
                <TeamSummary />
                <PlayerSummary />
            </div>
            
        );
    }
}