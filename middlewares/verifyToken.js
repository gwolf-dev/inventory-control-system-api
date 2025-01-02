const jwt = require('jsonwebtoken');
const getToken = require('../helpers/getToken');

const forbiddenResponse = (response) =>
  response.status(403).json({
    message: 'Acesso negado! Realize a autenticação de maneira correta.',
  });

const verifyToken = (request, response, next) => {
  if (!request.headers.authorization) return forbiddenResponse(response);

  const token = getToken(request);

  if (!token) return forbiddenResponse(response);
  try {
    const tokenVerify = jwt.verify(token, process.env.SECRET_JWT);
    request.user = tokenVerify;

    next();
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      message: 'Token inválido!',
    });
  }
};

module.exports = verifyToken;
