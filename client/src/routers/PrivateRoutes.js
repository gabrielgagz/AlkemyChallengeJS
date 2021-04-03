import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { DashboardScreen } from '../components/dashboard/DashboardScreen';

export const PrivateRoutes = () => {
    return (
        <Switch>
            <Route exact path='/dashboard' component={ DashboardScreen } />
            <Route exact path='/' component={ DashboardScreen } />
            <Redirect to='/' />
        </Switch>
    )
}
