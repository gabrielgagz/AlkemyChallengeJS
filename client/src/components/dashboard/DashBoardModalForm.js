import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../auth/AuthContext';
import { toast } from '../helpers/toast';
import '../../css/dashboard.css';

export const DashBoardModalForm = ( { edit, data } ) => {

    const { user } = useContext( AuthContext );

    // If we are editing, take values from props
    const initialForm = {
        type: (edit) ? data.movement_type : '',
        date: (edit) ? data.movement_date.toString().substr(0,10) : new Date().toISOString().split('T')[0],
        description: (edit) ? data.movement_description : '',
        amount: (edit) ? data.movement_amount : 0
    }

    const [ values, handleInputChange, reset ] = useForm( initialForm );

    const { amount, date, description, type } = values;

    // Reset form according to props
    useEffect( () => {

        reset(); 

    }, [ edit, data ] );

    // Push values into database
    const handleInsert = () => {

        const apiUrl = process.env.REACT_APP_API_URL;

        const movementData = {
            userid: user.id,
            date: date,
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
                    toast( '.modal', `ERROR: database operation has failed (${ data.error })`, 'ERROR' );
                    return
                }

                if (data.success) {
                    toast( '.modal', 'GREAT! Movement has been inserted', 'SUCCESS' );
                    reset();
                    return
                }
            }
            )
            .catch( err => { 
                toast( '.modal', `FATAL: ${err}`, 'ERROR' )  
            } );
    }

    // Validate input values
    const validateValues = ( e ) => {

        e.preventDefault();
        
        if ( amount === 0 || description === '') {
            toast( '.modal', 'Description is empty or amount is zero.', 'ERROR' );
            return;
        }

        if ( description.length < 6 ) {
            toast( '.modal', 'Description too short.', 'ERROR' );
            return;
        }

        if ( type === '' ) {
            toast( '.modal', 'You must choose a type', 'ERROR' );
            return;
        }

        handleInsert( amount, date, description, type );

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
                            <i className='fas fa-cloud-upload-alt mx-2'></i>
                            { ( edit ) ? 'Edit movement' : 'Insert new movement' }
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
                                        INGRESS
                                    </option>
                                    <option value='EGR'>
                                        EGRESS
                                    </option>
                                </select>
                            </div>
                            <div className='input-group flex-nowrap' >
                            <input
                                autoComplete='false'
                                className='form-control'
                                type="date"
                                max={ date }
                                name="date"
                                value={ date }
                                selected={ date }
                                onChange={ handleInputChange }
                                    required
                                />
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
                            Close
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

DashBoardModalForm.propTypes = {
    edit: PropTypes.bool.isRequired
};
