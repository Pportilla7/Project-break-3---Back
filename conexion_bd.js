const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '200113',
  database: 'projectbreak3'
});

// Conectar a la base de datos
connection.connect();

// Función para hashear la contraseña y luego insertar el profesor
const insertProfessor = (name, email, plainPassword) => {
  const saltRounds = 10;
  bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hasheando la contraseña:', err);
      return;
    }

    const sql = 'INSERT INTO profesor (name, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error insertando el profesor:', err);
      } else {
        console.log('Profesor insertado con ID:', results.insertId);
      }
    });
  });
};

// Insertar profesores con contraseñas hasheadas
insertProfessor('Carlos García', 'carlos.garcia@example.com', 'password1');
insertProfessor('María López', 'maria.lopez@example.com', 'password2');
insertProfessor('José Martínez', 'jose.martinez@example.com', 'password3');
insertProfessor('Ana Sánchez', 'ana.sanchez@example.com', 'password4');
insertProfessor('Luis Fernández', 'luis.fernandez@example.com', 'password5');
