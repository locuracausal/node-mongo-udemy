const debug = require('debug')('app:sales-controller');
const createError = require('http-errors')

const {SalesService} = require('./services')
const {Response} = require('../common/response')
const { UsersService} = require('../Usuarios/services')
const { ProductsService} = require('../Productos/services')
// const {UsersController} = require('../Usuarios/controller');


module.exports.SalesController = {
    getSale: async (req, res) => {
        try {
            let sale = await SalesService.getById(req.params.id);
            if (!sale)
                Response.error(res, new createError.NotFound)
            Response.success(res, 200, 'Saleo ' + req.params.id, sale)
            // res.json( Sale)
        } catch (error) {
            debug('Error getSale', error);
            // res.status(500).json({error: error})
            Response.error()
        }
        // res.send('getAll');
    },
    getSales: async (req, res) => {
        try {
            let sales = await SalesService.getAll();
            Response.success(res, 200, 'Lista de Ventas', sales)
        } catch (error) {
            debug('Error getSales', error);
            Response.error()
        }
       // res.send('getSale')
    }, 
    createSale: async (req, res) => {
        // debo validar que la el producto exista y tengo suficiente stock
        // debo validar que el usuario exista
        try {
            debug('Creating Sale', req.headers);
            const {body} = req
            const {userId, productId} = body
            debug('User id', userId.id)
            debug('ProductId id', productId.id)
            const userByDB = await UsersService.getById(userId.id)
            const productByDB = await ProductsService.getById(productId.id)
            debug('Usuario existe', userByDB)
            if (productByDB) 
            if (!body || Object.keys(body).length === 0 || !userByDB || !productId) Response.error(res, new createError.BadRequest('No existe body, product o user'))  
            if (!userByDB)  Response.error(res, new createError.BadRequest('No existe usuario en base de datos'))
            if (!productByDB) Response.error(res, new createError.BadRequest('No existe producto en base de datos'))

            // Falta validar stock y restarlo una vez realizada la venta
            let sale = await SalesService.create(req.body);
            res.status(200).json({sale})
        } catch (error) {
            debug('Error createSales', error);
            Response.error(res, new createError.BadRequest('Algo raro paso', error.message))
        }
        // res.send('createSale')
    }, generateReport: async (req, res) => {
        try {
            SalesService.generateReport('Inventario', res)
        } catch (error) {
            debug('Error generateReport', error);
            Response.error()
        }
    },
    updateSale: async (req, res) => {
        try {
            debug('Updating sales', req.headers);
            const {body} = req
            debug('Body', body);
            if (!body || Object.keys(body).length === 0) Response.error(res, new createError.BadRequest())  
            
            let sale = await SalesService.update(req.body);
            res.status(200).json({sale})
        } catch (error) {
            debug('Error updateSale', error);
            Response.error()
        }
    },
    deleteSale: async (req, res) => {
        try {
            debug('Deleting Sale', req.params.id);
            const id = req.params.id
            let message = await SalesService.deleteById(id);
            // res.status(200).json({Sale})
            Response.success(res, 200, message)
        } catch (error) {
            debug('Error deleteSale', error);
            Response.error()
        }
    },
    deleteSalesByParameters: async (req, res) => {
        try {
            debug('Deleting Sale', req.body)
            const { body } = req
            let message = await SalesService.deleteByParameter(body);
            Response.success(res, 200, message)

        }
        catch {
            debug('Error deleteSalesByParameters', error);
            Response.error()
        }
    }

    //Update Sale
    // Delete

}