const express = require('express');
const authenticateToken = require('../middleware/authMiddleware')
const {addEvents, fetchEvents, markAsDone} = require('../controllers/eventsController')

const router = express.Router();

router.get('/myEvents', authenticateToken, fetchEvents);
router.post('/addEvents', authenticateToken, addEvents);
router.put('/:id/mark-done', authenticateToken, markAsDone);


module.exports = router;