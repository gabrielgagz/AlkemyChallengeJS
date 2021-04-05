import React from 'react';
import PropTypes from 'prop-types';

export const DashBoardMovementsList = ( { data } ) => {

    const { movement_amount, movement_date, movement_description, movement_type } = data;


    return (
            <div className="container-fluid container-list my-2">
                <div className="row row-cols-2">
                    <div className="col w-75">
                        <i className={`fas fa-circle text-${ movement_type } me-3`}></i>
                        { movement_description }
                    </div>
                    <div className={ `col text-${ movement_type } w-25`}>
                        ${ movement_amount }
                    </div>
                    <div className="col mb-0 pb-0 w-75">
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
    )
}

DashBoardMovementsList.propTypes = {
    data: PropTypes.object.isRequired
};