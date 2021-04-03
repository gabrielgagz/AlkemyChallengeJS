import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/dashboard.css';

export const DbLayout = ( {data} ) => {

    return (
        <div className='container'>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
            <div className="col">
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
                            className='btn btn-add mx-4    mb-4 p-2 shadow-sm'
                        >
                            Add movement
                        </button>
                    </div>
                    
                </div>
                <div className="card shadow rounded border-0 mt-5 card-left animate__animated animate__fadeInLeft">
                    <div className="card-body">
                        <p className="card-title">
                            <i className="fa fa-money px-3" aria-hidden="true"></i>
                            Current Amount
                        </p>
                        <hr />
                        <p className="card-text">
                        </p>
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
                        <p className="card-text">
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}

DbLayout.propTypes = {
    data: PropTypes.array.isRequired
};

