const express = require('express');
const router = express.Router();
// const passport = require('passport');

const homeController = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'))
module.exports = router;