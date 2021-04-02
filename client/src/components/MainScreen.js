import React, { useReducer } from 'react';
import { AppRouter } from '../routers/AppRouter';
import { AuthContext } from '../auth/AuthContext';
import { authReducer } from '../auth/authReducer';

export const MainScreen = () => {

    const init = () => ( { logged: false } );

    const  [ user, dispatch ] = useReducer( authReducer, {}, init );

    return (
        <>
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
        </>
    )
}
