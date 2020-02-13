const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/admin');

router.get('/:location', adminController.getByLocation);

module.exports = router;