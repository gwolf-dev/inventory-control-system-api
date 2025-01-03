const connection = require('./config/connection');

const findByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?;';

  const [user] = await connection.execute(query, [email]);

  return user[0];
};

const findById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?;';

  const [user] = await connection.execute(query, [id]);

  return user[0];
};

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

const update = async (id, parameters) => {
  const { name, email, phone, password, language, image } = parameters;
  const query =
    'UPDATE users SET name = ?, email = ?, phone = ?, password = ?, language = ?, image = ? WHERE id = ?';

  const [updatedUser] = await connection.execute(query, [
    name,
    email,
    phone,
    password,
    language,
    image,
    id,
  ]);
  return updatedUser;
};

module.exports = { findByEmail, findById, register, update };
