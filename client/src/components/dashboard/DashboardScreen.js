import React, { useContext, useEffect, useState } from 'react';
import { NavBar } from './ui/NavBar';
import { AuthContext } from '../../auth/AuthContext';
import { DbLayout } from './ui/DbLayout';
import '../../css/dashboard.css';

export const DashboardScreen = () => {

    const { user } = useContext( AuthContext );

    // Get the user id
    const { id } = user;

    // Create state for data
    const [ dataState, setDataState] = useState({});

    const getMovements = () => {

        const apiUrl = process.env.REACT_APP_API_URL;

        fetch(`${apiUrl}/api/movements/${id}`)
            .then(response => response.json())
            .then(data => {

                // Save data in state
                setDataState( data );
            
            })
            .catch( err => { 
                setDataState({}); 
            } );
    }

    useEffect(() =>{

        getMovements();

    },[])

    return (
        <>
            <NavBar user={ user } />
            <div className='container'>
                <DbLayout data={ dataState } />
            </div>
            
        </>
    )
}
