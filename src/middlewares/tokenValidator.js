const tokenRegex = /\b[a-z0-9]{16}\b/i;
function tokenValidator(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (!tokenRegex.test(authorization)) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
}

module.exports = tokenValidator;
