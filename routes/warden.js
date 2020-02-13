const express = require('express');
const router = express.Router();
const wardenController = require('../app/api/controllers/warden');

router.get('/inmates', wardenController.getInmates);

module.exports = router;