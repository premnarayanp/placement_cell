const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentsController = require('../controllers/students_controller');
router.get('/', passport.checkAuthentication, studentsController.students);
router.get('/details/:id', passport.checkAuthentication, studentsController.details);
router.post('/create', passport.checkAuthentication, studentsController.create);
router.delete('/delete/:id', passport.checkAuthentication, studentsController.delete);
module.exports = router;