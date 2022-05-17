const express = require('express');
const debug =require('debug')('app:server');



const app = express();

const { ProductsAPI} = require('./src/Productos/index');
const {Config} = require('./src/config/index');


ProductsAPI(app);

app.use(express.json());
app.listen(Config.port, () => {
    debug('Server is running on port ' + Config.port);
    });
