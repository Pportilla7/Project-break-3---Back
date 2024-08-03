const express = require('express');
const router = express.Router();
const { readEvents, 
    filterEvents, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    login, 
    getDataUser, 
    getSubjectByProfesor, 
    getRooms, 
    getIdByProfIdAsigId, 
    getSubjectAndProfesorById, 
    getProfesorById, 
    getAsignaturaById,
    getAsignaturaByProfesorId } = require('../controller/controller.js');

const {authenticateToken} = require ('../middleware/loggin-middleware.js')

router.post('/login', login);
router.get('/readEvents', authenticateToken, readEvents);
router.get('/getSubjects', authenticateToken, getSubjectByProfesor);
router.get('/getRooms', authenticateToken, getRooms);
router.get('/getProfesorById', authenticateToken, getProfesorById);
router.get('/getAsignaturaByProfesorId', authenticateToken, getAsignaturaByProfesorId);
router.get('/getAsignaturaById', authenticateToken, getAsignaturaById);
router.get('/filterEvents/:fecha', authenticateToken, filterEvents);
router.get('/getProfAsigId', authenticateToken, getIdByProfIdAsigId);
router.post('/addEvent', authenticateToken, addEvent);
router.put('/actualizarEvent/:id', authenticateToken, updateEvent);
router.delete('/deleteEvent/:id', authenticateToken, deleteEvent);
router.get('/user', authenticateToken, getDataUser);
router.get('/getSubjectAndProfesorById', authenticateToken, getSubjectAndProfesorById);


module.exports = { router };
