const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
// Other user routes...

module.exports = router;
