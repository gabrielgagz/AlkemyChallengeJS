import React from 'react';
import PropTypes from 'prop-types';

export const DashBoardMovementsList = ( { data } ) => {

    const { movement_id, movement_amount, movement_date, movement_description, movement_type } = data;

    return (
        
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

    )
}

DashBoardMovementsList.propTypes = {
    data: PropTypes.object.isRequired
};