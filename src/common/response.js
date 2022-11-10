const debug = require('debug')('response-common');
const createError = require('http-errors')

module.exports.Response = {
    success: (res, status = 200, message = 'Ok', body = {}) => { 
        res.status(status).json({message, body})
    }, 
    error : (res, error = null) => {
        debug('Error in common response')
        const { statusCode, message } = error ? error : new createError.InternalServerError()
        res.status(statusCode).json({message})
    }
}