const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', tagController.getAll);
router.post('/', authMiddleware, roleMiddleware('admin'), tagController.addTag);

module.exports = router;
