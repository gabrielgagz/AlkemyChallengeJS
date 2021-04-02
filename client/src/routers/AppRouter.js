import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardScreen } from '../components/dashboard/DashboardScreen';

export const AppRouter = () => {
    
    return (
        <Router>
            <>
                <Switch>
                    <Route exact path="/" component={ LoginScreen }/>
                    <Route exact path="/login/" component={ LoginScreen }/>
                    <Route exact path="/dashboard/" component={ DashboardScreen }/>
                    <Redirect to="/" />
                </Switch>
            </>
        </Router>
    )
}
