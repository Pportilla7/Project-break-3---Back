const express = require('express');
const app = express();
require('dotenv').config();

const {router} = require('./routes/routes.js');

app.use('/', router);

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})