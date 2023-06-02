const express = require('express');
const router = express.Router();
const passport = require('passport');
const coursesController = require('../controllers/courses_controller');
router.get('/', passport.checkAuthentication, coursesController.courses);
router.post('/create', passport.checkAuthentication, coursesController.create);
router.post('/update/:id', passport.checkAuthentication, coursesController.update);
// router.delete('/delete/:id', passport.checkAuthentication, studentsController.delete);
module.exports = router;