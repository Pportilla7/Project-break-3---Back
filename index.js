const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');

const {router} = require('./routes/routes.js');
const {errorHandler} = require('./middleware/errores.js')

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})