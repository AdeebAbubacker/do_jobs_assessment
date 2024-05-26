const express = require('express');
const userController = require('../../controllers/userController/userController.js');
const userRoutes  = express.Router();



userRoutes.post('/users', userController.createUser);

module.exports = userRoutes;
