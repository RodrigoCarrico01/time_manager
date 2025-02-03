const express = require('express');
const ActivityController = require('../controllers/activityController');

const router = express.Router();

router.post('/', ActivityController.create);
router.get('/:userId', ActivityController.getAllByUser);

module.exports = router;
