require('dotenv').config();
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.CONTRAS_BD,
  database: 'projectbreak3'
};

// Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
    return;
  }
  console.log('Conexión a la base de datos establecida exitosamente.');
});

module.exports = connection;
