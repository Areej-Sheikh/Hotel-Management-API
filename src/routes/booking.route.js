const express = require("express");
const router = express();
const { authenticateUser } = require("../middlewares/auth.middleware");
const {createBooking,updateBooking,viewBooking,cancelBooking} = require('../controllers/booking.controller');

router.post('/', authenticateUser, createBooking)
router.get('/user/:userId', authenticateUser, viewBooking)
router.delete('/:id', authenticateUser, cancelBooking)
router.put('/:id', authenticateUser, updateBooking)

module.exports = router; 
