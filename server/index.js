'use-strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

// Import Models
const usersDb = require('./models/users');
const movementsDb = require('./models/movements');

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
    extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Finances App API' })
});

app.listen(port, () => {
    console.log(`Finances App running on port ${port}.`)
});

// CONTROLLER //

// User Routes
app.get('/api/users', usersDb.getUsers);
app.get('/api/users/:id', usersDb.getUserById);
app.post('/api/users', usersDb.createUser);
app.put('/api/users/:id', usersDb.updateUser);
app.delete('/api/users/:id', usersDb.deleteUser);

// Movements Routes
app.get('/api/movements/:id', movementsDb.getMovementsByUserId);
app.post('/api/movements', movementsDb.createMovement);
app.put('/api/movements/:id', movementsDb.updateMovement);
app.delete('/api/movements/:id', movementsDb.deleteMovement);