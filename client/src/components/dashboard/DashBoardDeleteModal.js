import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from '../helpers/toast';

export const DashBoardDeleteModal = ( { id } ) => {

    const { reload, setReload } = useContext( AppContext );

    const handleSubmit = ( e ) => {

        const apiUrl = process.env.REACT_APP_API_URL;

        e.preventDefault();

        fetch(
            // Check if we are trying to remove a single movement or all movements in database. -999999 is the id for the cleanup operation
            ( id === -999999 )
            ? `${apiUrl}/api/movements/`
            : `${apiUrl}/api/movements/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    toast( '.span-toast', `ERROR: database operation has failed (${ data.error })`, 'ERROR' );
                    return
                }

                if (data.success) {

                    // Change context to refresh layout
                    setReload( !reload );

                    document.querySelector('.btn-delete-close').click();
                    return
                }
            }
            )
            .catch( err => { 
                toast( '.span-toast', `FATAL: ${err}`, 'ERROR' )  
            } );

    }

    return (
        <div
            className='modal fade'
            id='deleteModal'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            data-id=''
            tabIndex='-1'
            aria-labelledby='deleteModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header modal-header-delete p-2'>
                        <i className='fas fa-exclamation-triangle mx-2'></i>
                        <h5 className='modal-title' id='deleteModalLabel'>
                            WARNING!
                        </h5>
                        <button
                            type='button'
                            className='btn-close btn-close-white'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body text-center'>
                        {
                            ( id === -999999 )
                            ? 'THIS WILL REMOVE ALL MOVEMENTS IN DATABASE.\n Are you sure you want to perform this action?'
                            : 'Are you sure you want to remove this movement?'
                        }
                    </div>
                    <div className='modal-footer justify-content-center'>
                        <button
                            type='button'
                            className='btn btn-secondary btn-delete-close'
                            data-bs-dismiss='modal'
                        >
                            Cancel
                        </button>
                            <form onSubmit={ handleSubmit }> 
                            <button
                                type='submit' 
                                className='btn btn-danger'
                            >
                                Do it!
                            </button>
                            <span className='span-toast'></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}