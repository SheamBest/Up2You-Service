const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/preferences', userController.getPreferences);
router.post('/preferences/create', userController.createPreferences);
router.delete('/preferences/:tagId', userController.deletePreference);
router.get('/saved', userController.getSavedServices);
router.post('/saved', userController.saveService);
router.delete('/saved/:serviceId', userController.deleteSavedService);

module.exports = router;
