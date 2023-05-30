const express = require('express');
const router = express.Router();
const passport = require('passport');
const batchesController = require('../controllers/batches_controller');
router.get('/:id', passport.checkAuthentication, batchesController.batches);
router.post('/create', passport.checkAuthentication, batchesController.create);
router.delete('/delete/:id', passport.checkAuthentication, batchesController.delete);
//isAuthenticated
module.exports = router;