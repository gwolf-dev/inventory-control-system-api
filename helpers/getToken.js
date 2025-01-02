const getToken = (request) => {
  const { authorization } = request.headers;
  const token = authorization.split(' ')[1];

  return token;
};

module.exports = getToken;
