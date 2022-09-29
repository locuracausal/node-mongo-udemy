const debug = require('debug')('app:sales-service');
const { Database } = require('../database/index');
// const { SalesUtils } = require('./utils')
const {ObjectId} = require('mongodb');
const COLLECTION = 'sales'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id : ObjectId(id)});
}

const create = async (sale) => {
    debug('Creating sale', sale);
    const collection = await Database(COLLECTION);
    const result = await collection.insertOne(sale);
    return result

}

const update = async (sale) => {
    debug('Updating sale', sale);
    const collection = await Database(COLLECTION);
    const filter = { _id: sale._id };
    // this option instructs the method to create a document if no documents match the filter
    const updateDoc = {
        $set: {
          ...sale
        },
      };
    const options = { upsert: true };
    const result = await collection.updateOne(filter, updateDoc, options);
    return result

}

// const generateReport = async (name, res) => {
//     let sales = await getAll()
//     salesUtils.excelGenerator(sales, name, res)
// }

const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    const query =     { _id: ObjectId(id)}  
    debug('Query id :', query)
    const result = await collection.deleteOne(query);
    debug('Delete by id result: ',result)
    return result.deletedCount === 1 ?  "Successfully deleted one document." : "No documents matched the query. Deleted 0 documents."
    // if (result.deletedCount === 1) {
    //   console.log("Successfully deleted one document.");
    // } else {
    //   console.log("No documents matched the query. Deleted 0 documents.");
    // }
    // return await collection.deleteOne({_id : ObjectId(id)});
}

const deleteByParameter = async (body) => {
    const collection = await Database(COLLECTION);
    const query = { ...body}  
    debug('Query parameters :', query)
    const result = await collection.deleteMany(query)
    const {deletedCount} = result
    return result.deletedCount > 0 ? "Successfully deleted " +  deletedCount +  " document." : "No documents matched the query. Deleted 0 documents."
}

// update sales
// delete sales

module.exports.SalesService = {
    getAll,
    getById,
    create,
    // generateReport,
    update,
    deleteById,
    deleteByParameter
}