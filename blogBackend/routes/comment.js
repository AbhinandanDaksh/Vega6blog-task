const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');


router.post('/:blogId', authMiddleware, commentController.addComment);
router.get('/:blogId', commentController.getComments);

module.exports = router;