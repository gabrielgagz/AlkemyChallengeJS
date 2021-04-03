import React, { useContext, useEffect, useState } from 'react';
import { DashBoardNavBar } from './DashBoardNavBar';
import { AuthContext } from '../../auth/AuthContext';
import { DashBoardLayout } from './DashBoardLayout';
import '../../css/dashboard.css';

export const DashboardScreen = () => {

    const { user, dispatch } = useContext( AuthContext );

    // Get the user id
    const { id } = user;

    // Create state for data
    const [ dataState, setDataState] = useState([{}]);

    useEffect(() =>{

        const apiUrl = process.env.REACT_APP_API_URL;

        fetch(`${apiUrl}/api/movements/${id}`)
            .then(response => response.json())
            .then(data => {

                // Save data in state
                setDataState( data );
            
            })
            .catch( err => { 
                setDataState([{}]); 
            } );

    },[ id ])

    return (
        <>
            <DashBoardNavBar user={ user } dispatch={ dispatch } />
            <div className='container'>
                <DashBoardLayout data={ dataState } />
            </div>
            
        </>
    )
}
