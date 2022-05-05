const express = require('express');
const usersController = require('./users.controller');

const router = express.Router();

router
    .route('/users/')
    .post(usersController.createUser)
    .get(usersController.getUsers)

router
    .route('/users/:id')
    .get(usersController.getUser)
    .delete(usersController.deleteUser)
    .put(usersController.updateUser)


module.exports = router;  
