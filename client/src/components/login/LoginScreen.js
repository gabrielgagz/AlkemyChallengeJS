import React, { useContext } from 'react';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import '../../css/login.css';

export const LoginScreen = () => {

    const history = useHistory();

    const { dispatch } = useContext( AuthContext );

    const initialForm = {
        username: '',
        password: ''
    }

    const [ values, handleInputChange, reset ] = useForm( initialForm );

    const { username, password } = values;

    // Show error alert
    const showToast = ( value ) => {

        const loginContainer = document.querySelector('.login-container')

        const alert = document.createElement('div');
        alert.innerHTML = `
            <div class="toast show animate__animated animate__fadeInDown" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex justify-content-center">
                    <div class="toast-body">
                    <i class="fas fa-exclamation-circle px-1 text-danger"></i> ${ value }
                    </div>
                </div>
            </div>`;

        if ( !document.querySelector('.toast') ) {

            loginContainer.append(alert);
            setTimeout(() => {
                document.querySelector('.toast').remove();
            }, 3000);

        }

        // Prevent api key url exposures
        console.clear();

    }

    // This will handle all the login process
    // Get the data from api-key, dispatch to context and redirect to dashboard
    const processLogin = ( data ) => {

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

            showToast('ERROR: password is incorrect');
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

        // Change text and disable login button
        const btnLogin = document.querySelector('.btn-login');
        btnLogin.innerText = 'WAIT!';
        btnLogin.disabled = true;
        
    
        // Cleanup form
        reset();

        history.push('/dashboard');
    }

    // Handle login form, fetch user from api key
    // if not exists or server is down, show an error alert
    const HandleLogin = () => {

        const apiUrl = process.env.REACT_APP_API_URL;

        fetch(`${apiUrl}/api/users/u/${username}`)
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    showToast( 'User not found in database.' );
                    return
                } 

                processLogin( data[0] );
            
            })
            .catch( err => { 
                showToast( `FATAL: ${err}` )  
            } );
    }

    // Validate input values
    const validateValues = ( e ) => {

        e.preventDefault();
        
        if ( username === '' || password === '') {
            showToast( 'User/password is empty.' );
            return;
        }

        if ( username.length < 6 || password.length < 6 ) {
            showToast( 'User/Password too short.' );
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
                        type='text'
                        autoComplete='true'
                        className='form-control' 
                        name='username'
                        placeholder='username'
                        value={ username }
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
                    <Link to='/' className={ 'links' }>Register NOW</Link> | <Link to='/' className={ 'links' }>Forgot Password</Link>
                </div>
            </div>
        </div>
    )
}
