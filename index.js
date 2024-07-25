const express = require('express');
const app = express();
require('dotenv').config();

const {router} = require('./routes/routes.js');
const {errorHandler} = require('./middleware/errores.js')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})