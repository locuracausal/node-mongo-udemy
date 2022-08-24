const debug = require('debug')('app:products-service');
const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils')
const {ObjectId} = require('mongodb');
const COLLECTION = 'products'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id : ObjectId(id)});
}

const create = async (product) => {
    debug('Creating product', product);
    const collection = await Database(COLLECTION);
    const result = await collection.insertOne(product);
    return result

}

const update = async (product) => {
    debug('Updating product', product);
    const collection = await Database(COLLECTION);
    const filter = { nombre: product.nombre };
    // this option instructs the method to create a document if no documents match the filter
    const updateDoc = {
        $set: {
          ...product
        },
      };
    const options = { upsert: true };
    const result = await collection.updateOne(filter, updateDoc, options);
    return result

}

const generateReport = async (name, res) => {
    let products = await getAll()
    ProductsUtils.excelGenerator(products, name, res)
}

// update products
// delete products

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    update
}