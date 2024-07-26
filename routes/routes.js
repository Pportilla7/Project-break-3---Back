const express = require('express');
const router = express.Router();
const { readEvents, filterEvents, addEvent, updateEvent, deleteEvent, login } = require('../controller/controller.js');
const {authenticateToken} = require ('../middleware/loggin-middleware.js')

router.post('/login', login);
router.get('/readEvents', authenticateToken, readEvents);
router.get('/filterEvents/:fecha', authenticateToken, filterEvents);
router.post('/addEvent', authenticateToken, addEvent);
router.put('/actualizarEvent/:id', authenticateToken, updateEvent);
router.delete('/deleteEvent/:id', authenticateToken, deleteEvent);

module.exports = { router };
