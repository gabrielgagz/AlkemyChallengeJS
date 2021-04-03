import React from 'react';
import PropTypes from 'prop-types';
import '../../css/dashboard.css';


export const DashBoardLayout = ( {data} ) => {

    return (
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
                <div className="col mb-5">
                    <div className="card shadow rounded border-0 card-left animate__animated animate__fadeInLeft">
                        <div className="card-body">
                            <p className="card-title">
                                <i className="fa fa-money px-3" aria-hidden="true"></i>
                                Current Amount
                            </p>
                            <hr />
                            <p className="card-amount px-3">
                                $76890,00
                            </p>
                            <hr />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button 
                                className='btn btn-add mx-3 mb-4 p-2 shadow-sm'
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
                <div className="col">
                    <div className="card shadow rounded border-0 card-movements animate__animated animate__fadeInRight">
                        <div className="card-body">
                            <p className="card-title">
                                <i className="fa fa-bar-chart p-2" aria-hidden="true"></i>
                                Your activity
                            </p>
                            <hr />
                                <ul className="list-group list-group-flush">
        
                                {
                                    // Check if data exists
                                    ( data ) &&
                                
                                    // Render movements in a list
                                    data.map( ( { movement_id, movement_amount, movement_date, movement_description, movement_type } ) => (
                                        
                                        <li className="list-group-item" key={`${ movement_id }`}>
                                        
                                            <div className="container-fluid my-2">
                                                <div className="row row-cols-2">
                                                    <div className="col w-75">
                                                        <i className={`fas fa-circle text-${ movement_type } me-3`}></i>
                                                        { movement_description }
                                                    </div>
                                                    <div className={ `col text-${ movement_type } w-25`}>
                                                        ${ movement_amount }
                                                    </div>
                                                    <div className="col mt-0 fst-italic w-75">
                                                    <i className='movement-type'></i>
                                                        { movement_type }
                                                    </div>
                                                    
                                                    <div className="col mt-0 fst-italic w-25">
                                                        { 
                                                            // If date is available, only get YYYY-MM-DD
                                                            (movement_date) &&
                                                                movement_date.toString().substr(0,10)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                    
                                        </li>
    
                                    ) )
                                    
                                }
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

DashBoardLayout.propTypes = {
    data: PropTypes.array.isRequired
};

