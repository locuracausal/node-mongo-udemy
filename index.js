const express = require('express');
const debug =require('debug')('app:server');


const app = express();

const {Config} = require('./src/config/index');


app.use(express.json());
app.listen(Config.port, () => {
    debug('Server is running on port ' + Config.port);
    });
