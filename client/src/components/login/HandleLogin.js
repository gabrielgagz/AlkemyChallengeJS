import React from 'react';
import { types } from '../../types/types';

export const HandleLogin = ( dispatch, reset, username, password ) => {

        
    dispatch( {
        type: types.login,
        payload: {
            username: username,
            password: password
        }
    } );

    // Cleanup form
    reset();

    return( 
        <>
        </> 
    );
}
