import React, { useContext } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AuthContext } from '../auth/AuthContext';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {

    const { user } = useContext( AuthContext );

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
