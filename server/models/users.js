'use-strict'

// DB connector helper
const pool = require('./helpers/dbConnect');

// Response helper
const handleResponse = require('./helpers/handleResponse');

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

const createUser = (request, response) => {

    const { firstname, lastname, nickname, profilepic, password, email } = request.body;
    
    pool.query('INSERT INTO users (user_firstname, user_lastname, user_nickname, user_profilepic, user_password, user_email) VALUES ($1, $2, $3, $4, $5, $6)', [firstname, lastname, nickname, profilepic, password, email], (error, results) => {

        handleResponse( error, response, results );

    });
}

const updateUser = (request, response) => {

    const id = parseInt(request.params.id);
    
    const { firstname, lastname, nickname, profilepic, password, email } = request.body;
    
    pool.query('UPDATE users SET user_firstname = $1, user_lastname = $2, user_nickname = $3, user_profilepic = $4, user_password = $5, user_email = $6 WHERE user_id = $7', [firstname, lastname, nickname, profilepic, password, email, id], (error, results) => {

        handleResponse( error, response, results );

    });
}

const deleteUser = (request, response) => {

    const id = parseInt(request.params.id);
    
    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {

        handleResponse( error, response, results );

    });
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}