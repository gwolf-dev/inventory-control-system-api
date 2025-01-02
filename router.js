const express = require('express');

const users = require('./controllers/users');

const userValidation = require('./middlewares/userValidation');

const router = express.Router();

router.get('/users/checkAuth', users.checkAuth);
router.post('/users/login', userValidation.login, users.login);
router.post('/users/register', userValidation.register, users.register);

module.exports = router;
