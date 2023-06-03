const express = require('express');
const router = express.Router();
const passport = require('passport');
const csvController = require('../controllers/csv_controller');
router.get('/download', passport.checkAuthentication, csvController.loadCsv);
//isAuthenticated
module.exports = router;