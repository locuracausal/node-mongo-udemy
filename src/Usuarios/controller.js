const debug = require('debug')('app:users-controller');
const createError = require('http-errors')

const { UsersService} = require('./services')
const {Response} = require('../common/response')

module.exports.UsersController = {
    getUser: async (req, res) => {
        try {
            let user = await UsersService.getById(req.params.id);
            if (!user)
                Response.error(res, new createError.NotFound)
            Response.success(res, 200, 'Usuario ' + req.params.id, user)
            // res.json( User)
        } catch (error) {
            debug('Error getUser', error);
            // res.status(500).json({error: error})
            Response.error()
        }
        // res.send('getAll');
    },
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de usuario', users)
        } catch (error) {
            debug('Error getUsers', error);
            Response.error()
        }
       // res.send('getUser')
    }, 
    createUser: async (req, res) => {
        try {
            debug('Creating usuario', req.headers);
            const {body} = req
            if (!body || Object.keys(body).length === 0) Response.error(res, new createError.BadRequest())  
            
            let users = await UsersService.create(req.body);
            
        } catch (error) {
            debug('Error createUsers', error);
            Response.error()
        }
        // res.send('createUser')
    }, 
    updateUser: async (req, res) => {
        try {
            debug('Updating user', req.headers);
            const {body} = req
            debug('Body', body);
            if (!body || Object.keys(body).length === 0) Response.error(res, new createError.BadRequest())  
            
            let user = await UsersService.update(req.body);
            Response.success(res, 200, 'Usuario actualizado', user)
        } catch (error) {
            debug('Error updateUser', error);
            Response.error()
        }
    },
    deleteUser: async (req, res) => {
        try {
            debug('Deleting User', req.params.id);
            const id = req.params.id
            let message = await UsersService.deleteById(id);
            // res.status(200).json({User})
            Response.success(res, 200, message)
        } catch (error) {
            debug('Error deleteUser', error);
            Response.error()
        }
    },
    deleteUsersByParameters: async (req, res) => {
        try {
            debug('Deleting User', req.body)
            const { body } = req
            let message = await UsersService.deleteByParameter(body);
            Response.success(res, 200, message)

        }
        catch {
            debug('Error deleteUsersByParameters', error);
            Response.error()
        }
    }

    //Update User
    // Delete

}