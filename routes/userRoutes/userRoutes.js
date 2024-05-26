const express = require('express');
const userController = require('../../controllers/userController/userController.js');
const userRoutes  = express.Router();



userRoutes.post('/users', userController.createUser);
userRoutes.get('/users', userController.getAllUsers);

module.exports = userRoutes;
