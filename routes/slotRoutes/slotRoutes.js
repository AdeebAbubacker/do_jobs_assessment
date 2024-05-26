
const express = require('express');
const slotController = require('../../controllers/slotController/slotController.js');
const slotRoutes  = express.Router();


slotRoutes .post('/slots', slotController.createSlot);
slotRoutes .get('/slots', slotController.getSlots);


module.exports = slotRoutes;
