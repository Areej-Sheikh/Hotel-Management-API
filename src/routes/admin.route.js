const express = require("express");
const router = express();
const { adminMiddleware } = require("../middlewares/admin.middleware");
const{getUsers,deleteUsers,getProperties,deleteProperties,getBookings,singlePayment,Payments} = require('../controllers/admin.controller')

router.get('/users',adminMiddleware, getUsers);
router.delete('/users/:id', adminMiddleware, deleteUsers);

router.get('/properties', adminMiddleware, getProperties);
router.delete('/properties/:id', adminMiddleware, deleteProperties);

router.get('/bookings', adminMiddleware, getBookings);

router.get('/payments', adminMiddleware, Payments);
router.get('/payments/:id', adminMiddleware, singlePayment)
module.exports = router; 
