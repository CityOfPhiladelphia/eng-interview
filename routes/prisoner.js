const express = require('express');
const router = express.Router();
const prisonerController = require('../app/api/controllers/prisoner');

router.get('/pid/:pid', prisonerController.getByPID);
router.get('/name/:firstName/:lastName/:dob', prisonerController.getByName);

module.exports = router;