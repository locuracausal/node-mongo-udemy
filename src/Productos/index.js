const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const {ProductsController} = require('./controller');


const jsonParser = bodyParser.json();
module.exports.ProductsAPI = (app) => {
    router
        .post('/', jsonParser, ProductsController.createProduct)
        .get('/', ProductsController.getProducts)
        .get('/:id',  ProductsController.getProduct)
        
    app.use('/api/products', router);
}