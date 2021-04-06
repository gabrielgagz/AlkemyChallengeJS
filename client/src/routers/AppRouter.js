import React, { useContext } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AppContext } from '../context/AppContext';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {

    const { user } = useContext( AppContext );

    return (
        <Router>
            <>
                <Switch>
                    {
                        (user.logged) 
                        ? <PrivateRoutes />
                        : <PublicRoutes />
                    }
                </Switch>
            </>
        </Router>
    )
}
