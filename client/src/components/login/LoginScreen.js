import React, { useContext } from 'react';
import logo from '../../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../auth/AuthContext';
import { toast } from '../helpers/toast';
import { types } from '../../types/types';
import '../../css/login.css';


export const LoginScreen = () => {

    const history = useHistory();

    const { dispatch } = useContext( AuthContext );

    const initialForm = {
        email: '',
        password: ''
    }

    const [ values, handleInputChange, reset ] = useForm( initialForm );

    const { email, password } = values;

    // This will handle all the login process
    // Get the data from api-key, dispatch to context and redirect to dashboard
    const processLogin = ( data ) => {

        // Change text and disable login button
        const btnLogin = document.querySelector('.btn-login');
        btnLogin.innerText = 'WAIT!';
        btnLogin.disabled = true;

        // Get user data
        const {
            user_id,
            user_email, 
            user_firstname,
            user_lastname,
            user_nickname,
            user_password,
            user_profilepic 
        } = data;

        if ( password !== user_password ) {

            toast( '.container', 'ERROR: password is incorrect', 'ERROR');
            return;

        } 

        // Send user data to context
        dispatch( {
            type: types.login,
            payload: {
                id: user_id,
                username: user_nickname,
                password: user_password,
                name: user_firstname,
                lastname: user_lastname,
                email: user_email,
                profilepic: user_profilepic
            }
        } );
    
        // Cleanup form
        reset();

        history.push('/dashboard');
    }

    // Handle login form, fetch user from api key
    // if not exists or server is down, show an error alert
    const HandleLogin = () => {

        const apiUrl = process.env.REACT_APP_API_URL;

        fetch(`${apiUrl}/api/users/u/${email}`)
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    toast( '.container', 'Email not found in database.', 'ERROR' );
                    return
                } 

                processLogin( data[0] );
            
            })
            .catch( err => { 
                toast( '.container', `FATAL: ${err}`, 'ERROR' )  
            } );
    }

    // Validate input values
    const validateValues = ( e ) => {

        e.preventDefault();
        
        if ( email === '' || password === '') {
            toast( '.container', 'Email/password is empty.', 'ERROR' );
            return;
        }

        if ( email.length < 6 || password.length < 6 ) {
            toast( '.container', 'Email/password too short.', 'ERROR' );
            return;
        }

        HandleLogin();

    } 

    return (
        <div className='container text-center my-5 d-flex align-items-center justify-content-center animate__animated animate__fadeInDown'>
            <div className='card form-content shadow d-flex align-items-center justify-content-center login-container'>
                <img className='img-fluid logo-login' src={ logo } alt='Finances App Logo' />
                <form onSubmit={ validateValues }>
                    <input 
                        type='email'
                        autoComplete='true'
                        className='form-control' 
                        name='email'
                        placeholder='email'
                        value={ email }
                        onChange={ handleInputChange }
                        required
                    />
                    <input 
                        type='password'
                        autoComplete='false'
                        className='form-control' 
                        name='password' 
                        placeholder='password'
                        value={ password } 
                        onChange={ handleInputChange }
                        required
                    />
                    <button 
                        className='btn btn-login shadow'
                    >
                        LOGIN
                    </button>
                </form>
                <div className='form-footer mt-5'>
                    <button
                        className={ 'links' }
                        onClick={ () => toast( '.container', 'Not implemented yet, sorry.', 'ERROR' ) }
                    >
                        Forgot Password
                    </button>
                </div>
            </div>
        </div>
    )
}
