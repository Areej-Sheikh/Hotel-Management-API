const express = require("express");
const router = express();
const { authenticateUser } = require("../middlewares/auth.middleware");
const { addReview,updateReview,deleteReview,allReviews} = require('../controllers/review.controller');

router.post('/', authenticateUser,addReview)
router.put('/:id', authenticateUser,updateReview)
router.delete('/:id', authenticateUser,deleteReview)
router.get('/:propertyId', allReviews)
module.exports = router; 
