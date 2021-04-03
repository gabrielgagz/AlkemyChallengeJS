import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo_white.svg';
import '../../../css/navbar.css';

export const NavBar = ( { user } ) => {

    const { profilepic } = user;
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-brand shadow py-3 px-0 animate__animated animate__fadeInDown">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                Profile
                            </a>
                        </li>
                        <li className="nav-item mb-3">
                            <a className="nav-link" href="/">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
                <img className='img-responsive nv-logo' src={ logo } alt='logo'/>
                <img className='img-fluid' src={ `${profilepic}&color=ffffff&background=11b8a1&bold=true` } alt='User avatar'/>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    user: PropTypes.object.isRequired
};
