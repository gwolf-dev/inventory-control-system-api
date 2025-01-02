const bcrypt = require('bcrypt');

const model = require('../models/users');
const createUserToken = require('../helpers/createUserToken');

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
    return response.status(500).json({ message: error });
  }
};

module.exports = { register };
