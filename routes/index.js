const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/batches', require('./batches'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));
router.use('/interviews', require('./interviews')); //interviews route
module.exports = router;