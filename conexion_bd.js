require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.contraseña_acceso_bd,
  database: 'projectbreak3'
};

// Profesores
const profesores = [
  { id: 16844, nombre: 'Juan Pérez', email: 'juan.perez@example.com', password: 'juanperez' },
  { id: 17423, nombre: 'María Gómez', email: 'maria.gomez@example.com', password: 'mariagomez' },
  { id: 18234, nombre: 'Luis Martínez', email: 'luis.martinez@example.com', password: 'luismartinez' }
];

// Asignaturas
const asignaturas = [
  { id: 1001, nombre: 'Matemáticas', codigo: 'MATH101' },
  { id: 1002, nombre: 'Física', codigo: 'PHYS101' },
  { id: 2001, nombre: 'Programación', codigo: 'CHEM101' }
];

// Relación profesor_asignatura
const profesorAsignatura = [
  { profesor_id: 16844, asignatura_id: 1001 },
  { profesor_id: 16844, asignatura_id: 1002 },
  { profesor_id: 17423, asignatura_id: 1001 },
  { profesor_id: 17423, asignatura_id: 2001 },
  { profesor_id: 18234, asignatura_id: 1002 },
  { profesor_id: 18234, asignatura_id: 2001 }
];

(async function() {
  console.log(process.env.contraseña_acceso_bd)
  const connection = await mysql.createConnection(dbConfig);

  // Insertar datos en profesores
  for (const profesor of profesores) {
    const hashedPassword = await bcrypt.hash(profesor.password, 12);
    await connection.query(`
      INSERT INTO profesores (id, nombre, email, contraseña) VALUES (?, ?, ?, ?)
    `, [profesor.id, profesor.nombre, profesor.email, hashedPassword]);
  }

  // Insertar datos en asignaturas
  for (const asignatura of asignaturas) {
    await connection.query(`
      INSERT INTO asignaturas (id, nombre, codigo) VALUES (?, ?, ?)
    `, [asignatura.id, asignatura.nombre, asignatura.codigo]);
  }

  // Insertar datos en profesor_asignatura
  for (const pa of profesorAsignatura) {
    await connection.query(`
      INSERT INTO profesor_asignatura (profesor_id, asignatura_id) VALUES (?, ?)
    `, [pa.profesor_id, pa.asignatura_id]);
  }

  console.log('Datos insertados correctamente.');
  await connection.end();
})();
