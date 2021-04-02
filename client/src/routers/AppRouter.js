import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';

export const AppRouter = () => {
    
    return (
        <Router>
            <>
                <Switch>
                    <Route exact path="/" component={ LoginScreen }/>
                    <Route exact path="/login/" component={ LoginScreen }/>
                    <Redirect to="/" />
                </Switch>
            </>
        </Router>
    )
}
