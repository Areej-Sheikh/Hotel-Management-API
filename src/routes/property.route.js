const express = require('express')
const router = express()
const {authenticateUser} = require('../middlewares/auth.middleware');
const {createProperty,updateProperty} = require('../controllers/property.controller')


router.post('/', authenticateUser, createProperty)
router.put('/:id', authenticateUser, updateProperty)

// {
//     "title":"New Property",
//      "description":"A Nice Place",
//       "location": "Bhopal", 
//       "price": "2000", 
//       "images":["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//        "amenities": ["Wifi", "Drinking Water", "AC", "Fan"] 
//     }

module.exports = router;