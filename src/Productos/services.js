const debug = require('debug')('app:products-service');
const { Database } = require('../database/index');
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



module.exports.ProductsService = {
    getAll,
    getById,
    create
}