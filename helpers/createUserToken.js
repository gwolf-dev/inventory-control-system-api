const jwt = require('jsonwebtoken');

const createUserToken = async (user, request, response) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      userLanguage: user.language,
    },
    process.env.SECRET_JWT,
  );

  return response.status(200).json({
    message: 'Autenticação realizada com sucesso!',
    token,
  });
};

module.exports = createUserToken;
