const jwt = require('jsonwebtoken');

const createUserToken = async (user, request, response) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      userLanguage: user.language,
    },
    process.env.SECRET_JWT,
  );

  return response.status(201).json({
    message: 'Usuário criado e autenticado com sucesso!',
    token,
  });
};

module.exports = createUserToken;
