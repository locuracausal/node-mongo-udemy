const {MongoClient} = require('mongodb');
const debug = require('debug')('app:database');
const { Config } = require('../config/index');

var connection = null

module.exports.Database = (collection) => new Promise (async (resolve, reject) => {
    try {
        if(!connection){
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexion a la base de datos');

        }
        debug('Reutilizando conexion');
        const db = connection.db(Config.mongoDbName);
        
        resolve(db.collection(collection));
    } catch (error) {
        debug('Algo anda mal', error);
        reject(error);
    }
})