import React from 'react';
import { Router, BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Homepage from '../components/Homepage';
import { Dashboard } from '../components/playerStats/Dashboard';
import { PlayerStatsPage } from '../components/playerStats/PlayerStatsPage';
import { createBrowserHistory } from 'history';

const AppRouter = () => (
    <Router history={createBrowserHistory()}>
        <div>
            <Switch>
                <Route path="/" component={ Homepage } exact={true}/>
                <Route path="/stats" component={ Dashboard } exact={true}/>
                <Route path="/stats/:id" component={PlayerStatsPage} exact={true} />
            </Switch>
        </div>
    </Router>
);


export default AppRouter;