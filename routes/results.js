const express = require('express');
const router = express.Router();
const passport = require('passport');
const resultsController = require('../controllers/results_controller');
router.post('/update/:id', passport.checkAuthentication, resultsController.update);
//isAuthenticated
module.exports = router;