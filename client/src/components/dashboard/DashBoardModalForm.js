import React from 'react';
import '../../css/dashboard.css';

export const DashBoardModalForm = () => {

    return (
        <div
            className="modal fade"
            id="dashboardModalForm"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="dashboardModalFormLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="dashboardModalFormLabel">
                        <i className="fas fa-cloud-upload-alt mx-2"></i>Insert new movement
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">

                        <div className='input-group flex-nowrap'>
                        <select className='form-select'>
                            <option>
                                Choose type
                            </option>
                            <option>
                                ING
                            </option>
                            <option>
                                EGR
                            </option>
                        </select>
                        </div>
                        <div className='input-group flex-nowrap'>
                        <input type='number' className='form-control' placeholder='Amount' aria-label='name' aria-describedby='addon-wrapping' />
                        </div>
                        <div className='input-group flex-nowrap'>
                        <input type='text' className='form-control' placeholder='Description' aria-label='description' aria-describedby='addon-wrapping' />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary px-3"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-send py-2 px-4">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
