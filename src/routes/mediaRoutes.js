const express = require('express');
const multer = require('multer');
const MediaController = require('../controllers/mediaController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const upload = multer({ dest: 'uploads/' });  // Armazena ficheiros temporariamente em uploads/

const router = express.Router();

router.post('/', upload.single('file'), AuthMiddleware.authenticateToken, MediaController.upload);
router.get('/:activityId', AuthMiddleware.authenticateToken, MediaController.getByActivityId);

module.exports = router;
