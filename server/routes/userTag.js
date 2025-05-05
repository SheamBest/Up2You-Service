const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userTagController = require('../controllers/userTagController');

router.use(authMiddleware);
router.get('/', userTagController.getUserTags);
router.post('/', userTagController.createUserTag);
router.post('/attach', userTagController.addTagToService);
router.post('/detach', userTagController.removeTagFromService);
router.delete('/:tagId', userTagController.deleteUserTag);

module.exports = router;
