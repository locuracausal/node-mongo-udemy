const express = require('express');
const debug =require('debug')('app:server');



const app = express();
const {SalesAPI} = require('./src/Ventas/index')
const { ProductsAPI} = require('./src/Productos/index');
const { UsersAPI } = require('./src/Usuarios/index');
const {Config} = require('./src/config/index');


ProductsAPI(app);
UsersAPI(app); 
SalesAPI (app)

app.use(express.json());
app.listen(Config.port, () => {
    debug('Server is running on port ' + Config.port);
    });
