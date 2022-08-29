const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const {ProductsController} = require('./controller');


const jsonParser = bodyParser.json();
module.exports.ProductsAPI = (app) => {
    router
        .get('/:id',  ProductsController.getProduct)   
        .delete('/:id', ProductsController.deleteProduct) 
        .post('/', jsonParser, ProductsController.createProduct)
        .get('/', ProductsController.getProducts)
        .put('/',jsonParser, ProductsController.updateProduct)
        .delete('/', jsonParser, ProductsController.deleteProductsByParameters)
        .get('/reports', ProductsController.generateReport)
        
        
        // update 
        // delete
        
        
    app.use('/api/products', router);
}