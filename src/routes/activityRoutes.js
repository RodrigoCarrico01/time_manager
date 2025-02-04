const express = require('express');
const ActivityController = require('../controllers/activityController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', AuthMiddleware.authenticateToken, ActivityController.create);
router.get('/:userId', AuthMiddleware.authenticateToken, ActivityController.getAllByUser);

module.exports = router;
