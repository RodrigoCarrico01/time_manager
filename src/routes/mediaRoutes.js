const express = require('express');
const multer = require('multer');
const MediaController = require('../controllers/mediaController');

const upload = multer({ dest: 'uploads/' });  // Armazena ficheiros temporariamente em uploads/

const router = express.Router();

router.post('/', upload.single('file'), MediaController.upload);
router.get('/:activityId', MediaController.getByActivityId);

module.exports = router;
