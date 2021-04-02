'use strict'

const usersRoutes = require('../helpers/express');
const usersDb = require('../models/users');

// Users Routes
usersRoutes.get('/api/users', usersDb.getUsers);
usersRoutes.get('/api/users/:id', usersDb.getUserById);
usersRoutes.get('/api/users/u/:username', usersDb.getUserByUsername);
usersRoutes.post('/api/users', usersDb.createUser);
usersRoutes.put('/api/users/:id', usersDb.updateUser);
usersRoutes.delete('/api/users/:id', usersDb.deleteUser);

module.exports = usersRoutes;