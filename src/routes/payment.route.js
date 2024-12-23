const express = require("express");
const router = express();
const {authenticateUser} = require('../middlewares/auth.middleware');
const{processPayment,fetchPayment} = require('../controllers/payment.controller')

router.post('/', authenticateUser,processPayment)
router.get('/fetch-payment/:id', authenticateUser,fetchPayment)
module.exports = router; 