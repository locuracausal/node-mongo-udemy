const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const {ProductsController} = require('./controller');


const jsonParser = bodyParser.json();
module.exports.ProductsAPI = (app) => {
    router
        .post('/', jsonParser, ProductsController.createProduct)
        .get('/', ProductsController.getProducts)
        .put('/',jsonParser, ProductsController.updateProduct)
        .get('/reports', ProductsController.generateReport)
        .get('/:id',  ProductsController.getProduct)
        // update 
        // delete
        
        
    app.use('/api/products', router);
}