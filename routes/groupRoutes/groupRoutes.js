const express = require('express');
const groupController = require('../../controllers/groupController/groupController.js');
const groupRoutes = express.Router();


groupRoutes.post('/groups', groupController.createGroup);
groupRoutes.put('/groups/:groupId/users', groupController.addUsersToGroup);
groupRoutes.get('/groups/users/:groupId?', groupController.getUsersFromGroup);



module.exports = groupRoutes;

