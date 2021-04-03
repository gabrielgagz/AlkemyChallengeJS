import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginScreen } from '../components/login/LoginScreen';

export const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path='/login' component={ LoginScreen } />
            <Route exact path='/' component={ LoginScreen } />
            <Redirect to='/' />
        </Switch>
    )
}
