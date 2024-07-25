const db = require('../conexion_bd.js');

async function readEvents(req, res) {
    try {
        const [eventos] = await db.query('SELECT * FROM eventos');
        res.send(eventos);
    } catch (error) {
        next(error);
    }
}

async function filterEvents(req, res, next) {
    const fecha = req.params.fecha;
    try {
        const [eventos] = await db.query('SELECT * FROM eventos WHERE DATE(fecha_hora) = ?', [fecha]);
        if (eventos.length > 0) {
            res.json(eventos);
        } else {
            res.status(404).send('No se encontraron eventos para esta fecha');
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

module.exports = {
    readEvents,
    filterEvents,
    addEvent,
    updateEvent,
    deleteEvent
};
