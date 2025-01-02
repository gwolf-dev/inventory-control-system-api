module.exports = async (request, response, next) => {
  const { name, email, password, confirmPassword, phone } = request.body;

  if (!name)
    return response
      .status(400)
      .json({ message: 'O campo name é obrigatório!' });

  if (!email)
    return response
      .status(400)
      .json({ message: 'O campo email é obrigatório!' });

  if (!phone)
    return response
      .status(400)
      .json({ message: 'O campo phone é obrigatório!' });

  if (!password)
    return response
      .status(400)
      .json({ message: 'O campo password é obrigatório!' });

  if (!confirmPassword)
    return response
      .status(400)
      .json({ message: 'O campo confirmPassword é obrigatório!' });

  if (password.length < 0 || password.length > 128)
    return response.status(400).json({
      message: 'A senha deve ser maior que 0 e menor que 128 caracteres.',
    });

  if (password !== confirmPassword)
    return response.status(400).json({
      message:
        'As senhas devem ser iguais! Verifique novamente os campos de senha e confirmar senha.',
    });

  next();
};
