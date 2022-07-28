const debug = require('debug')('app:products-controller');
const createError = require('http-errors')

const {ProductsService} = require('./services')
const {Response} = require('../common/response')

module.exports.ProductsController = {
    getProduct: async (req, res) => {
        try {
            let product = await ProductsService.getById(req.params.id);
            if (!product)
                Response.error(res, new createError.NotFound)
            Response.success(res, 200, 'Producto ' + req.params.id, product)
            // res.json( product)
        } catch (error) {
            debug('Algo anda mal', error);
            // res.status(500).json({error: error})
            Response.error()
        }
        // res.send('getAll');
    },
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            // return products
            Response.success(res, 200, 'Lista de productos', products)
            res.status(200).json({products})
        } catch (error) {
            debug('Algo anda mal', error);
            Response.error()
        }
       // res.send('getProduct')
    }, 
    createProduct: async (req, res) => {
        try {
            debug('Creating product', req.headers);
            const {body} = req
            if (!body || Object.keys(body).length === 0) Response.error(res, new createError.BadRequest())  
            
            let product = await ProductsService.create(req.body);
            res.status(200).json({product})
        } catch (error) {
            debug('Algo anda mal', error);
            Response.error()
        }
        // res.send('createProduct')
    }

}