import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DashBoardMovementsList } from './DashBoardMovementsList';
import { DashBoardModalForm } from './DashBoardModalForm';
import '../../css/dashboard.css';

export const DashBoardLayout = ( {data} ) => {

    // Save movements refs
    const ingState = useRef([]);
    const egrState = useRef([]);
    const sum = (a, b) => parseInt(a) + parseInt(b);

    // Modal Form
    const dashboardModalForm = DashBoardModalForm();

    return (
        <div className='container'>
            <div className='row row-cols-1 row-cols-md-2 g-4 mt-5'>
                <div className='col'>
                    <div className='card shadow rounded border-0 card-left animate__animated animate__fadeInLeft'>
                        <div className='card-body'>
                            <p className='card-title'>
                                <i className='fa fa-money px-3' aria-hidden='true'></i>
                                Current Amount
                            </p>
                            <hr />
                            <p className='card-amount px-3'>
                                ${ 
                                    ingState.current.reduce(sum, 0) 
                                    - 
                                    egrState.current.reduce(sum, 0)
                                }
                            </p>
                            <hr />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button 
                                className='btn btn-add mx-3 mb-4 p-2 shadow-sm'
                                data-bs-toggle='modal' data-bs-target='#dashboardModalForm'
                            >
                                Add movement
                            </button>
                            <button 
                                className='btn btn-danger mx-3 mb-4 p-2 shadow-sm'
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
                                                // Push movement amount to egrState
                                                ingState.current.push( data.movement_amount );

                                                return (
                                                    <li className="list-group-item" key={`${ data.movement_id }`}>
                                                    <DashBoardMovementsList data={ data } />
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
                                                
                                                // Push movement amount to egrState
                                                egrState.current.push( data.movement_amount );

                                                return (
                                                    <li className="list-group-item" key={`${ data.movement_id }`}>
                                                    <DashBoardMovementsList data={ data } />
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
            { dashboardModalForm }
        </div>
    );

}

DashBoardLayout.propTypes = {
    data: PropTypes.array.isRequired
};

