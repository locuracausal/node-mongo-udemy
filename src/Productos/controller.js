const debug = require('debug')('app:products-controller');

const {ProductsService} = require('./services')

module.exports.ProductsController = {
    getProduct: async (req, res) => {
        try {
            let product = await ProductsService.getById(req.params.id);
            res.json( product)
        } catch (error) {
            debug('Algo anda mal', error);
            res.status(500).json({error: error})
        }
        // res.send('getAll');
    },
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            // return products
            res.status(200).json({products})
        } catch (error) {
            debug('Algo anda mal', error);
            res.status(500).json({error: error})
        }
       // res.send('getProduct')
    }, 
    createProduct: async (req, res) => {
        try {
            const {body} = req
            debug('Creating product', req.headers);
            let product = await ProductsService.create(req.body);
            res.status(200).json({product})
        } catch (error) {
            debug('Algo anda mal', error);
            res.status(500).json({error: error})
        }
        // res.send('createProduct')
    }

}