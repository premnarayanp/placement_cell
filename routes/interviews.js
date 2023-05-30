const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewsController = require('../controllers/interviews_controller');
router.get('/', passport.checkAuthentication, interviewsController.interviews);

// router.post('/create', passport.checkAuthentication, studentsController.create);
// router.delete('/delete/:id', passport.checkAuthentication, studentsController.delete);
module.exports = router;