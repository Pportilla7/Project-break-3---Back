const express = require('express');
const router = express.Router();
const { readEvents, filterEvents, addEvent, updateEvent, deleteEvent } = require('../controller/controller.js');

router.get('/readEvents', readEvents);
router.get('/filterEvents/:fecha', filterEvents);
router.post('/addEvent', addEvent);
router.put('/actualizarEvent/:id', updateEvent);
router.delete('/deleteEvent/:id', deleteEvent);

module.exports = { router };
