// DB connector helper
const pool = require('./helpers/dbConnect').pool;
// Response helper
const handleResponse = require('./helpers/handleResponse').handleResponse;

const getUsers = (request, response) => {
    
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {

        handleResponse( error, response, results );

    });
}

const getUserById = (request, response) => {

    const id = parseInt(request.params.id);
    
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {

        handleResponse( error, response, results );

    });
}

module.exports = {
    getUsers,
    getUserById
}