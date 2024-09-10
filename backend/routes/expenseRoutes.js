const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {addExpense, getExpenses, editExpense, deleteExpenses, fetchSingle, getUserExpenses, reportsData, generateReport, resetPassword, frogotPassword} = require('../controllers/expenseController');

const router = express.Router();

router.post('/add', authenticateToken, addExpense);
router.get('/get', authenticateToken, getExpenses);
router.put('/:id', authenticateToken, editExpense);
router.delete('/:id', authenticateToken, deleteExpenses)
router.get('/:id', authenticateToken, fetchSingle )
router.get('/user/:id', authenticateToken, getUserExpenses )
router.get('/report', authenticateToken,  generateReport)
router.post('/forgot-password', frogotPassword )
router.post('/reset-password/:code',  resetPassword)



module.exports = router;


