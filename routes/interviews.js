const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewsController = require('../controllers/interviews_controller');
router.get('/', passport.checkAuthentication, interviewsController.interviews);
router.post('/create', passport.checkAuthentication, interviewsController.create);
router.post('/assign', passport.checkAuthentication, interviewsController.assign);
router.get('/details/:id', passport.checkAuthentication, interviewsController.details);
// router.delete('/delete/:id', passport.checkAuthentication, studentsController.delete);
module.exports = router;