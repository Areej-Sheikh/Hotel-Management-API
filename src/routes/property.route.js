const express = require('express')
const router = express()
const {authenticateUser} = require('../middlewares/auth.middleware');
const {createProperty,updateProperty,deleteProperty,viewProperty,searchMyProperties,searchProperties} = require('../controllers/property.controller')

router.post('/', authenticateUser, createProperty)
router.get('/me', authenticateUser, searchMyProperties)
router.get('/search', searchProperties)
router.put('/:id', authenticateUser, updateProperty)
router.delete('/:id', authenticateUser, deleteProperty)
router.get('/:id',viewProperty)

module.exports = router; 