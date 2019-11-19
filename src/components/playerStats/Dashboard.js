import React from 'react';
import { TeamSummary } from './TeamSummary';
import { PlayerSummary } from './PlayerSummary';
import NavBar from '../NavBar';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const jwtToken = sessionStorage.getItem('jwtToken');
        const role = sessionStorage.getItem('userRole');

        if (jwtToken === null || role === null) {
            this.props.history.push('/login');
        }
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