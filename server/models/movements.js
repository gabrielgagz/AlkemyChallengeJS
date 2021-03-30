'use-strict'

// DB connector helper
const pool = require('./helpers/dbConnect').pool;

// Response helper
const handleResponse = require('./helpers/handleResponse').handleResponse;

const getMovementsByUserId = (request, response) => {

    const id = parseInt(request.params.id);
    
    pool.query('SELECT * FROM movements WHERE movement_userid = $1', [id], (error, results) => {

        handleResponse( error, response, results );

    });
}

const createMovement = (request, response) => {

    const { date, type, amount, userid } = request.body;
    
    pool.query('INSERT INTO movements (movement_date, movement_type, movement_amount, movement_userid) VALUES ($1, $2, $3, $4)', [date, type, amount, userid], (error, results) => {

        handleResponse( error, response, results );

    });
}

const updateMovement = (request, response) => {

    const id = parseInt(request.params.id);

    const { date, type, amount, userid } = request.body;
    
    pool.query('UPDATE movements SET movement_date = $1, movement_type = $2, movement_amount = $3, movement_userid = $4 WHERE movement_id = $5', [date, type, amount, userid, id], (error, results) => {

        handleResponse( error, response, results );

    });
}

const deleteMovement = (request, response) => {

    const id = parseInt(request.params.id);
    
    pool.query('DELETE FROM movements WHERE movement_id = $1', [id], (error, results) => {

        handleResponse( error, response, results );

    });
}


module.exports = {
    getMovementsByUserId,
    createMovement,
    updateMovement,
    deleteMovement,
}