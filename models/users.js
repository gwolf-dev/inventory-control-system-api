const connection = require('./config/connection');

const register = async (parameters) => {
  const { name, email, phone, password, language, image } = parameters;
  const query =
    'INSERT INTO users(name, email, phone, password, language, image) VALUES (?, ?, ?, ?, ?, ?);';

  const [user] = await connection.execute(query, [
    name,
    email,
    phone,
    password,
    language,
    image,
  ]);

  return { insertId: user.insertId };
};

const findByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?;';

  const [emailFinded] = await connection.execute(query, [email]);

  return emailFinded[0];
};

module.exports = { register, findByEmail };
