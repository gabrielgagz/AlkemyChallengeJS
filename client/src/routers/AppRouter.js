import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { AuthContext } from '../auth/AuthContext';

export const AppRouter = () => {

    const { user } = useContext( AuthContext );

    return (
        <Router>
            <>
                <Switch>
                    <Route exact path="/" component={ LoginScreen }/>
                    {
                        ( user.logged ) &&
                        <Route exact path="/dashboard/" component={ DashboardRoutes }/>

                    }
                    <Redirect to="/" />
                </Switch>
            </>
        </Router>
    )
}
