import React from 'react';
import { Router, BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Homepage from '../components/Homepage';
import { Dashboard } from '../components/playerStats/Dashboard';
import { PlayerStatsPage } from '../components/playerStats/PlayerStatsPage';
import { TrainingPlanSection } from '../components/trainingPlan/TrainingPlanSection';
import GameSchedules from '../components/gameSchedule/GameSchedules';
import { createBrowserHistory } from 'history';
import Login from '../components/user/login/Login';
import { Signup } from '../components/user/signup/Signup';
import Profile from '../components/profile/Profile';
import { GameDetailsSection } from '../components/gameDetails/GameDetailsSection';

const AppRouter = () => (
    <Router history={createBrowserHistory()}>
        <div>
            <Switch>
                <Route path="/" component={ Homepage } exact={true}/>
                <Route path="/login" component={ Login } exact={true} />
                <Route path="/signup" component={ Signup } exact={true} />
                <Route path="/profile" component={ Profile } exact={true} />
                <Route path="/schedule" component={ GameSchedules } exact={true} />
                <Route path="/gameDetails/:guestTeam/:gameDate" component={ GameDetailsSection } exact={true} />
                <Route path="/trainingPlan" component={ TrainingPlanSection } exact={true} />
                <Route path="/stats" component={ Dashboard } exact={true}/>
                <Route path="/stats/:id" component={PlayerStatsPage} exact={true} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;