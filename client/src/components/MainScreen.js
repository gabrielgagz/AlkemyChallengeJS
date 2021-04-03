import React, { useEffect, useReducer } from 'react';
import { AppRouter } from '../routers/AppRouter';
import { AuthContext } from '../auth/AuthContext';
import { authReducer } from '../auth/authReducer';

export const MainScreen = () => {

    // Get user status from localstorage
    const init = () => {
        return JSON.parse(localStorage.getItem('user')) || { logged: false };
    };

    const [ user, dispatch ] = useReducer( authReducer, {}, init );

    // Save user status to localstorage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify( user ));
    }, [user]);

    return (
        <>
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
        </>
    )
}
