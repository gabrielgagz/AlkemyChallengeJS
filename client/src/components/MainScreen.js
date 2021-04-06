import React, { useEffect, useReducer, useState } from 'react';
import { AppRouter } from '../routers/AppRouter';
import { AppContext } from '../context/AppContext';
import { authReducer } from '../auth/authReducer';

export const MainScreen = () => {

    // Get user status from localstorage
    const init = () => {
        return JSON.parse(localStorage.getItem('user')) || { logged: false };
    };

    const [ user, dispatch ] = useReducer( authReducer, {}, init );

    const [reload, setReload] = useState( false );

    // Save user status to localstorage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify( user ));
    }, [user]);

    return (
        <>
        <AppContext.Provider value={{ user, dispatch, reload, setReload }}>
            <AppRouter />
        </AppContext.Provider>
        </>
    )
}
