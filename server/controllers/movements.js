'use strict'

const movementsRoutes = require('../helpers/express');
const movementsDb = require('../models/movements');

// Movements Routes
movementsRoutes.get('/api/movements/:id', movementsDb.getMovementsByUserId);
movementsRoutes.post('/api/movements', movementsDb.createMovement);
movementsRoutes.put('/api/movements/:id', movementsDb.updateMovement);
movementsRoutes.delete('/api/movements/:id', movementsDb.deleteMovement);

module.exports = movementsRoutes;