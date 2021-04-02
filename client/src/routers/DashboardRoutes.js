import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { DashboardScreen } from '../components/dashboard/DashboardScreen';

export const DashboardRoutes = () => {
    return (
        <Switch>
            <Route exact path='/dashboard' component={ DashboardScreen } />
            <Redirect to='/' />
        </Switch>
    )
}
