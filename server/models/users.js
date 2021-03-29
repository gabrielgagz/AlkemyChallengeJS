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

const createUser = (request, response) => {

    const { firstname, lastname, nickname, profilepic } = request.body;
    
    pool.query('INSERT INTO users (user_firstname, user_lastname, user_nickname, user_profilepic) VALUES ($1, $2, $3, $4)', [firstname, lastname, nickname, profilepic], (error, results) => {

        handleResponse( error, response, results );

    });
}

const updateUser = (request, response) => {

    const id = parseInt(request.params.id);

    const { firstname, lastname, nickname, profilepic } = request.body;
    
    pool.query('UPDATE users SET user_firstname = $1, user_lastname = $2, user_nickname = $3, user_profilepic = $4 WHERE user_id = $5', [firstname, lastname, nickname, profilepic, id], (error, results) => {

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