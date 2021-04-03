import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { types } from '../../types/types';
import logo from '../../assets/logo_white.svg';
import '../../css/navbar.css';

export const DashBoardNavBar = ( { dispatch } ) => {

    const history = useHistory();

    const handleLogout = () => {

        dispatch( {
            type: types.logout
        } );

        history.replace('/')
    }
    
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-brand shadow py-3 px-0 d-flex justify-content-between animate__animated animate__fadeInDown'>
            <img className='img-fluid nv-logo' src={ logo } alt='Logo'/>
            <div className='mx-3'>
                <button 
                    className='btn btn-secondary'
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>
            
        </nav>
    );
}

DashBoardNavBar.propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};
