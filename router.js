const express = require('express');

const users = require('./controllers/users');

const userValidation = require('./middlewares/userValidation');
const verifyToken = require('./middlewares/verifyToken');

const router = express.Router();

router.get('/users/checkAuth', users.checkAuth);
router.patch(
  '/users/edit/:id',
  verifyToken,
  userValidation.register,
  users.edit,
);
router.post('/users/login', userValidation.login, users.login);
router.post('/users/register', userValidation.register, users.register);

module.exports = router;
