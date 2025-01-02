const express = require('express');

const users = require('./controllers/users');

const userValidation = require('./middlewares/userValidation');

const router = express.Router();

router.post('/users/register', userValidation, users.register);

module.exports = router;
