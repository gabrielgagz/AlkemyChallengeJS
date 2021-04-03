import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo_white.svg';
import '../../../css/navbar.css';

export const NavBar = ( { user } ) => {

    const { profilepic } = user;
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-brand shadow py-3 px-0 d-flex justify-content-between animate__animated animate__fadeInDown">
            <img className='img-fluid nv-logo' src={ logo } alt='Logo'/>
            <img className='img-fluid' src={ `${profilepic}&color=ffffff&background=11b8a1&bold=true` } alt='User avatar'/>
        </nav>
    );
}

NavBar.propTypes = {
    user: PropTypes.object.isRequired
};
