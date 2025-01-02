const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const model = require('../models/users');

const edit = async (request, response) => {
  const { id } = request.params;
  const { name, email, phone, password, confirmPassword, language } =
    request.body;
  const user = request.user;
  const userExists = await model.findById(id);
  const emailExists = await model.findByEmail(email);

  if (!userExists)
    return response.status(400).json({ message: 'Usuário não existe' });

  if (user.email !== email && emailExists)
    return response.status(400).json({
      message:
        'Por favor, utilize outro e-mail que não foi cadastrado na plataforma.',
    });

  if (password === confirmPassword && password !== null) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  user.email = email;
  user.name = name;
  user.phone = phone;
  user.language = language;

  try {
    await model.update(id, user);

    return response
      .status(200)
      .json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: error.message });
  }
};

const checkAuth = (request, response) => {
  const { authorization } = request.headers;
  let currentUser = null;

  if (authorization) {
    const token = getToken(request);
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    currentUser = decoded;
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
    console.error(error);
    return response.status(500).json({ message: error.message });
  }
};

module.exports = { edit, checkAuth, login, register };
