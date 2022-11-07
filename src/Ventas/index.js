const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const {SalesController} = require('./controller');


const jsonParser = bodyParser.json();
module.exports.SalesAPI = (app) => {
    router
        .get('/:id',  SalesController.getSale)   
        .delete('/:id', SalesController.deleteSale) 
        .post('/', jsonParser, SalesController.createSale)
        .get('/', SalesController.getSales)
        .put('/',jsonParser, SalesController.updateSale)
        .delete('/', jsonParser, SalesController.deleteSalesByParameters)
        .get('/reports', SalesController.generateReport)
        
        // update 
        // delete
        
    app.use('/api/sales', router);
}