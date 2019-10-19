import React from 'react';
import { TeamSummary } from './TeamSummary';
import { PlayerSummary } from './PlayerSummary';
import { NavBar } from '../NavBar';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
            <NavBar />
                <div style={{ margin:"30px 30px" }}>
                    <TeamSummary />
                    <PlayerSummary />
                </div>
            </div>
            
        );
    }
}