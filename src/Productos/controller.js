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
            debug('Error getProduct', error);
            // res.status(500).json({error: error})
            Response.error()
        }
        // res.send('getAll');
    },
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de productos', products)
        } catch (error) {
            debug('Error getProducts', error);
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
            debug('Error createProducts', error);
            Response.error()
        }
        // res.send('createProduct')
    }, generateReport: async (req, res) => {
        try {
            ProductsService.generateReport('Inventario', res)
        } catch (error) {
            debug('Error generateReport', error);
            Response.error()
        }
    },
    updateProduct: async (req, res) => {
        try {
            debug('Updating product', req.headers);
            const {body} = req
            debug('Body', body);
            if (!body || Object.keys(body).length === 0) Response.error(res, new createError.BadRequest())  
            
            let product = await ProductsService.update(req.body);
            res.status(200).json({product})
        } catch (error) {
            debug('Error updateProduct', error);
            Response.error()
        }
    },
    deleteProduct: async (req, res) => {
        try {
            debug('Deleting product', req.params.id);
            const id = req.params.id
            let message = await ProductsService.deleteById(id);
            // res.status(200).json({product})
            Response.success(res, 200, message)
        } catch (error) {
            debug('Error deleteProduct', error);
            Response.error()
        }
    },
    deleteProductsByParameters: async (req, res) => {
        try {
            debug('Deleting product', req.body)
            const { body } = req
            let message = await ProductsService.deleteByParameter(body);
            Response.success(res, 200, message)

        }
        catch {
            debug('Error deleteProductsByParameters', error);
            Response.error()
        }
    }

    //Update product
    // Delete

}