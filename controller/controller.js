const db = require('../conexion_bd.js');
const { verifyPassword, generateToken } = require ('./login.js')

async function getDataUser(req, res, next){
    const user = req.user;
    console.log(user.id);
    try{
        const [rows] = await db.query('SELECT id, nombre FROM profesores WHERE id = ?', [user.id]);
    
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Profesor no encontrado' });
        }
    
        const profesor = rows[0];
        res.json(profesor);
    }
    catch(error){
        next(error);
    }
}

async function login(req, res, next){
    const {email, password}=req.body;
    console.log(email,password);
    try{
        if (!email || !password) {
            return res.status(400).send('Introduzca email y contraseña');
        }
        const resultado = await db.query(
            'SELECT * FROM profesores WHERE email = ?',
            [email]
        )

        if (resultado.length === 0) {
            return res.status(404).send('Profesor no encontrado');
        }
        const profesor= resultado[0];
        console.log('esto es la profesor', profesor[0].contraseña);
        const profesorVerificado = await verifyPassword(password, profesor[0].contraseña);

        if(profesorVerificado){
            console.log('despues de haber verificado todo, antes de generar el token', profesor);
            const token = generateToken(profesor);
            res.json({ token }); 
        }
    }
    catch(error){
        next(error);
    }
}

async function readEvents(req, res) {
    try {
        const [eventos] = await db.query('SELECT * FROM eventos');
        console.log(eventos);
        res.send(eventos);
    } catch (error) {
        next(error);
    }
}

async function filterEvents(req, res, next) {
    const fecha = req.params.fecha;
    let { hora, aula } = req.query;
    hora+=':00';
    console.log(fecha, hora, aula);
    try {
        const evento = await db.query(
            'SELECT * FROM eventos WHERE DATE(fecha_hora) = ? AND TIME(fecha_hora) = ? AND aula_id = ?',
            [fecha, hora, aula]
        );
        console.log(evento[0]);
        if (evento[0].length > 0) {
            res.json({ esOcupada: true });
        } else {
            res.json({ esOcupada: false });
        }
    } catch (error) {
        next(error);
    }
}

async function addEvent(req, res, next) {
    const event = req.body;
    try {
        await db.query('INSERT INTO eventos (tipo, profesor_asignatura_id, aula_id, fecha_hora) VALUES (?, ?, ?, ?)', [event.tipo, event.profesor_asignatura_id, event.aula_id, event.fecha_hora]);
        res.status(201).send('Evento añadido con éxito');
    } catch (error) {
        next(error);
    }
}

async function updateEvent(req, res, next) {
    const { id } = req.params;
    const event = req.body;

    if (!id || !event || Object.keys(event).length === 0) {
        return res.status(400).send('Datos insuficientes para la actualización');
    }

    try {
        const [result] = await db.query('UPDATE eventos SET tipo=?, profesor_asignatura_id=?, aula_id=?, fecha_hora=? WHERE id=?', [event.tipo, event.profesor_asignatura_id, event.aula_id, event.fecha_hora, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('No se encontró el evento con el ID proporcionado o no se necesitaba actualización');
        }
        res.status(200).send('Evento actualizado con éxito');
    } catch (error) {
        next(error);
    }
}

async function deleteEvent(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("No se ha recibido un id para buscar");
    }
    try {
        const result = await db.query('DELETE FROM eventos WHERE id = ?', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Evento no encontrado');
        }
        res.send('Evento eliminado con éxito');
    } catch (error) {
        next(error);
    }
}

async function getSubjectByProfesor(req, res, next) {
    const user = req.user;
    try {
      const arr = await db.query('SELECT asignatura_codigo FROM profesor_asignatura WHERE profesor_id = ?', [user.id]);
      console.log('dentro del try y mostramos lo que recibimos', arr);
    //   if (asignatura_codigos.length === 0) {
    //     return res.status(404).send('No hay asignaturas para este profesor');
    //   }

      const codigos = arr[0].map(objeto => objeto.asignatura_codigo);
      console.log(codigos);
      const asignaturas = await db.query('SELECT * FROM asignaturas WHERE codigo IN (?)', [codigos]);
      console.log(asignaturas);
    //   if (asignaturas.length === 0) {
    //     return res.status(404).send('No hay asignaturas');
    //   }
      
      res.json(asignaturas[0]);
      
    } catch (error) {
      next(error);
    }
}

async function getRooms(req, res, next){
    try{
        var aulas = await db.query('SELECT id FROM aulas');
        if (!aulas || aulas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron aulas' });
        }

        const codigos_aulas= aulas[0].map(aula=>aula.id);
        console.log(codigos_aulas);

        res.json(codigos_aulas);
    }
    catch(error){
        next(error);
    }
}

async function getProfAsigId(req, res, next){
    const { profesor_id, asignatura_codigo } = req.query;
    try{
        const result = await db.query('SELECT id FROM profesor_asignatura WHERE profesor_id=? AND asignatura_codigo=?', [profesor_id, asignatura_codigo]);
        console.log(result[0]);
        const profesor_asignatura_id= result[0].map(arr => arr.id);
        res.json(profesor_asignatura_id);
    }
    catch(error){
        next(error);
    }
}

async function getSubjectAndProfesorById(req, res, next) {
    const {id} = req.query;
    console.log(id);
    try {
      const result = await db.query('SELECT profesor_id, asignatura_codigo FROM profesor_asignatura WHERE id = ?', [id]);
      console.log(result);
    
      res.json(result[0][0]);
      
    } catch (error) {
      next(error);
    }
}
 
async function getProfesorById(req, res, next){
    const {id} = req.query;
    console.log(id);
    try {
      const result = await db.query('SELECT id, nombre FROM profesores WHERE id = ?', [id]);
      console.log(result[0][0]);
    
      res.json(result[0][0]);
      
    } catch (error) {
      next(error);
    }
}

async function getAsignaturaById(req, res, next){
    const {id} = req.query;
    console.log(id);
    try {
      const result = await db.query('SELECT * FROM asignaturas WHERE codigo = ?', [id]);
      console.log(result[0][0]);
    
      res.json(result[0][0]);
      
    } catch (error) {
      next(error);
    }
}

async function getAsignaturaByProfesorId(req, res, next){
    const {id} = req.query;
    console.log(id);
    try {
      const result = await db.query('SELECT asignatura_codigo FROM profesor_asignatura WHERE profesor_id = ?', [id]);
      console.log(result);
      const codigo = result[0].map(obj => obj.asignatura_codigo);
      console.log(codigo)
    
      res.json(codigo);
      
    } catch (error) {
      next(error);
    }
}

module.exports = {
    readEvents,
    filterEvents,
    addEvent,
    updateEvent,
    deleteEvent, 
    login,
    getDataUser,
    getSubjectByProfesor,
    getRooms,
    getProfAsigId,
    getSubjectAndProfesorById,
    getProfesorById,
    getAsignaturaById,
    getAsignaturaByProfesorId
};
