const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const {UsersController} = require('./controller');


const jsonParser = bodyParser.json();
module.exports.UsersAPI = (app) => {
    router
        .get('/:id',  UsersController.getUser)   
        .delete('/:id', UsersController.deleteUser) 
        .post('/', jsonParser, UsersController.createUser)
        .get('/', UsersController.getUsers)
        .put('/',jsonParser, UsersController.updateUser)
        .delete('/', jsonParser, UsersController.deleteUsersByParameters)
        // .get('/reports', UsersController.generateReport)
        
        
        // update 
        // delete
        
        
    app.use('/api/users', router);
}