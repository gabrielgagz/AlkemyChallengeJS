import React, { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../auth/AuthContext';
import { toast } from '../helpers/toast';
import '../../css/dashboard.css';

export const DashBoardModalForm = () => {

    const { user } = useContext( AuthContext );

    const initialForm = {
        type: '',
        description: '',
        amount: 0
    }

    const [ values, handleInputChange, reset ] = useForm( initialForm );

    const { amount, description, type } = values;

    // Push values into database
    const handleInsert = () => {

        const apiUrl = process.env.REACT_APP_API_URL;

        const movementData = {
            userid: user.id,
            date: new Date().toISOString(),
            type: type,
            amount: parseInt(amount),
            description: description
        };
        
        fetch(`${apiUrl}/api/movements`, {
            method: 'POST',
            body: JSON.stringify(movementData),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    toast( '.modal', `ERROR: database operation has failed (${ data.error })` );
                    return
                }
            }
            )
            .catch( err => { 
                toast( '.modal', `FATAL: ${err}` )  
            } );
    }

    // Validate input values
    const validateValues = ( e ) => {

        e.preventDefault();
        
        if ( amount === 0 || description === '') {
            toast( '.modal', 'Description is empty or amount is zero.' );
            return;
        }

        if ( description.length < 6 ) {
            toast( '.modal', 'Description too short.' );
            return;
        }

        if ( type === '' ) {
            toast( '.modal', 'You must choose a type' );
            return;
        }

        handleInsert( amount, description, type );

    } 

    return (
        <div
            className='modal fade'
            id='dashboardModalForm'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex='-1'
            aria-labelledby='dashboardModalFormLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='dashboardModalFormLabel'>
                        <i className='fas fa-cloud-upload-alt mx-2'></i>Insert new movement
                        </h5>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body'>

                        <form id='modal-add' onSubmit={ validateValues }>
                            <div className='input-group flex-nowrap'>
                                <select 
                                    className='form-select'
                                    name='type'
                                    value={ type }
                                    onChange={ handleInputChange }
                                >
                                    <option value=''>
                                        Choose type
                                    </option>
                                    <option value='ING'>
                                        ING
                                    </option>
                                    <option value='EGR'>
                                        EGR
                                    </option>
                                </select>
                            </div>
                            <div className='input-group flex-nowrap'>
                                <input 
                                    type='number' 
                                    className='form-control' 
                                    placeholder='Amount' 
                                    name='amount'
                                    value={ amount }
                                    onChange={ handleInputChange }
                                    required
                                />
                            </div>
                            <div className='input-group flex-nowrap'>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Description'
                                    maxLength='25' 
                                    name='description'
                                    value={ description }
                                    onChange={ handleInputChange }
                                    required
                                />
                            </div>
                        </form>

                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary px-3'
                            data-bs-dismiss='modal'
                        >
                            Cancel
                        </button>
                        <button 
                            type='submit' 
                            className='btn btn-send py-2 px-4'
                            form='modal-add'
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
