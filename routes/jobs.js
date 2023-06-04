const express = require('express');
const router = express.Router();
const passport = require('passport');
const jobsPostsController = require('../controllers/jobsPosts_controller');
router.get('/posts', passport.checkAuthentication, jobsPostsController.posts);
module.exports = router;