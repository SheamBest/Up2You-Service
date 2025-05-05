const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

router.get('/', authMiddleware, serviceController.getAll);
router.get('/recommended', authMiddleware, serviceController.getRecommended);
router.get('/:id', authMiddleware, serviceController.getOne);
router.post('/', authMiddleware, serviceController.addService);
router.put('/:id/verify', authMiddleware, roleMiddleware('admin'), adminController.verifyService);
router.delete('/:serviceId', authMiddleware, roleMiddleware('admin'), serviceController.deleteService);
router.post('/search-by-tags', authMiddleware, serviceController.findServicesByTags);

module.exports = router;