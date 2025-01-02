const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const model = require('../models/users');

const checkAuth = (request, response) => {
  const { authorization } = request.headers;
  let currentUser = null;

  if (authorization) {
    const token = getToken(request);
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    currentUser = decoded;
  } else {
    // talvez fazer um 403
  }

  response.status(200).json(currentUser);
};

const login = async (request, response) => {
  const { email, password } = request.body;
  const user = await model.findByEmail(email);

  if (!user)
    return response.status(400).json({
      message: 'Não existe usuário cadastrado com esse e-mail.',
    });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    return response.status(400).json({
      message: 'Senha inválida.',
    });

  await createUserToken(user, request, response);
};

const register = async (request, response) => {
  const { email, password, image } = request.body;

  if (email) {
    const emailExists = await model.findByEmail(email);

    if (emailExists)
      return response.status(400).json({
        message:
          'Este e-mail já foi cadastrado, por favor utilize outro e-mail.',
      });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await model.register({
      ...request.body,
      email,
      password: passwordHash,
      image: !image || image.length === 0 ? null : image,
    });

    await createUserToken(user, request, response);
  } catch (error) {
    response.status(500).json({ message: error });
  }
};

module.exports = { checkAuth, login, register };
