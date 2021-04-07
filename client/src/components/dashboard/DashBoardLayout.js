import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DashBoardMovementsList } from './DashBoardMovementsList';
import { DashBoardModalForm } from './DashBoardModalForm';
import { DashBoardDeleteModal } from './DashBoardDeleteModal';
import '../../css/dashboard.css';

export const DashBoardLayout = ( {data} ) => {


    // Save movement id on a state
    const [idState, setIdState] = useState(0);

    // This are used for add/edit form
    const [editState, setEditState] = useState(false);
    const [dataState, setDataState] = useState({});

    // State for current amount
    const [amountState, setAmountState] = useState( { value: 0, negative: false } );

    // Calculate current amount
    useEffect ( () =>  {

        let finalState = 0;

        // Check if we have some data to iterate
        if ( data.length > 0 ) {

            data.forEach( data => {

                if ( data.movement_type === 'ING' ) {
                    finalState += parseInt(data.movement_amount);
                }

                if ( data.movement_type === 'EGR' ) {
                    finalState -= parseInt(data.movement_amount);
                }

            });
        }

        // Check if amount is negative
        if ( Math.sign(finalState) === -1 ) {

            setAmountState ( {
                value: finalState,
                class: 'text-danger'
            });

        } else {

            setAmountState ( {
                value: finalState,
                class: ''
            });

        }

    }, [ data]);

    return (
        <div className='container'>
            <div className='row row-cols-1 row-cols-md-2 g-4 my-5'>
                <div className='col'>
                    <div className='card shadow rounded border-0 card-left animate__animated animate__fadeInLeft container-toast-fixed'>
                        <div className='card-body'>
                            <p className='card-title'>
                                <i className='fa fa-money px-3' aria-hidden='true'></i>
                                Current Amount
                            </p>
                            <hr />
                            { 
                                <p className={`card-amount px-3 ${ amountState.class }`}>
                                    ${ amountState.value }
                                </p>

                            }
                            <hr />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button 
                                className='btn btn-add mx-3 mb-4 p-2 shadow-sm'
                                data-bs-toggle='modal' 
                                data-bs-target='#dashboardModalForm'
                                onClick={ () => setEditState( false ) }
                            >
                                Add movement
                            </button>
                            <button 
                                className='btn btn-danger mx-3 mb-4 p-2 shadow-sm'
                                data-bs-toggle='modal'      
                                data-bs-target='#deleteModal'
                                onClick={ () => setIdState( -999999 ) }
                            >
                                Clean movements
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className='col'>
                    <div className='card shadow rounded border-0 card-movements animate__animated animate__fadeInRight'>
                        <div className='card-body'>
                            <p className='card-title'>
                                <i className='fa fa-bar-chart p-2' aria-hidden='true'></i>
                                Your activity
                            </p>
                            <hr />
                                <ul className='list-group list-group-flush'>
        
                                    {
                                        (data.length > 0) &&
                                        // Iterate and draw movements
                                        data.map( ( data ) => {

                                            return (
                                                <li className="list-group-item" key={`${ data.movement_id }`}>

                                                <DashBoardMovementsList data={ data } />

                                                <div className="mb-3 mx-4 fst-italic w-75 footer-list">
                                                    <i className='movement-type'></i>
                                                        { data.movement_type }
                                                        <button 
                                                            className='btn btn-outline-secondary btn-sm btn-list-edit mx-2'
                                                            data-bs-toggle='modal' 
                                                            data-bs-target='#dashboardModalForm'
                                                            onClick={ () => { setEditState( true ); setDataState( data ) } }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            className='btn btn-outline-secondary btn-sm btn-list-delete ms-0'
                                                            data-bs-toggle='modal'      
                                                            data-bs-target='#deleteModal'
                                                            onClick={ () => setIdState( data.movement_id ) }
                                                        >
                                                            Delete
                                                        </button>
                                                </div>

                                                </li>
                                                )

                                        } )
                                        }

                                </ul>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card shadow rounded border-0 card-movements animate__animated animate__fadeInRight'>
                        <div className='card-body'>
                            <p className='card-title'>
                                <i className='fa fa-arrow-up p-2' aria-hidden='true'></i>
                                Ingress
                            </p>
                            <hr />
                                <ul className='list-group list-group-flush'>
        
                                    {
                                        (data.length > 0) &&
                                        // Iterate and draw movements
                                        data.map( ( data ) => {

                                            if ( data.movement_type === 'ING' ) {

                                                return (
                                                    <li className="list-group-item" key={`${ data.movement_id }`}>
                                                        <DashBoardMovementsList data={ data } />

                                                        <div className="mb-3 mx-4 fst-italic w-75 footer-list">
                                                            <i className='movement-type'></i>
                                                            { data.movement_type }
                                                            <button 
                                                                className='btn btn-outline-secondary btn-sm btn-list-edit mx-2'
                                                                data-bs-toggle='modal' 
                                                                data-bs-target='#dashboardModalForm'
                                                                onClick={ () => { setEditState( true ); setDataState( data ) } }
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                className='btn btn-outline-secondary btn-sm btn-list-delete ms-0'
                                                                data-bs-toggle='modal'      
                                                                data-bs-target='#deleteModal'
                                                                onClick={ () => setIdState( data.movement_id ) }
                                                            >
                                                            Delete
                                                            </button>
                                                        </div>
                                                        
                                                    </li>
                                                    )
                                            }
                                            // Fallback return
                                            return ('');
                                        } )
                                    }

                                </ul>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card shadow rounded border-0 card-movements animate__animated animate__fadeInRight'>
                        <div className='card-body'>
                            <p className='card-title'>
                                <i className='fas fa-arrow-down p-2' aria-hidden='true'></i>
                                Egress
                            </p>
                            <hr />
                                <ul className='list-group list-group-flush'>
        
                                    {
                                        (data.length > 0) &&
                                        // Iterate and draw movements
                                        data.map( ( data ) => {

                                            if ( data.movement_type === 'EGR' ) {

                                                return (
                                                    <li className="list-group-item" key={`${ data.movement_id }`}>
                                                    <DashBoardMovementsList data={ data } />
                                                    
                                                    <div className="mb-3 mx-4 fst-italic w-75 footer-list">
                                                            <i className='movement-type'></i>
                                                            { data.movement_type }
                                                            <button 
                                                                className='btn btn-outline-secondary btn-sm btn-list-edit mx-2'
                                                                data-bs-toggle='modal' 
                                                                data-bs-target='#dashboardModalForm'
                                                                onClick={ () => { setEditState( true ); setDataState( data ) } }
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                className='btn btn-outline-secondary btn-sm btn-list-delete ms-0'
                                                                data-bs-toggle='modal'      
                                                                data-bs-target='#deleteModal'
                                                                onClick={ () => setIdState( data.movement_id ) }
                                                            >
                                                            Delete
                                                            </button>
                                                    </div>

                                                    </li>
                                                    )
                                            }
                                            // Fallback return
                                            return ('');
                                        } )
                                    }

                                </ul>
                        </div>
                    </div>
                </div>
            </div>
            { 
                <DashBoardModalForm edit={ editState } data={ dataState } /> 
            }
            { 
                // Call delete modal with movement id as parameter
                <DashBoardDeleteModal id={ idState }/> 
            }
        </div>
    );

}

DashBoardLayout.propTypes = {
    data: PropTypes.array.isRequired
};

