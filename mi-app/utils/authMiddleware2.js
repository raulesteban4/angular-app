const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clave_super_secreta'; // process.env.SECRET-KEY

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuarioId = decoded.id;
    req.usuarioPerfil = decoded.perfil || 'Usuario';
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido o expirado' });
  }
};

module.exports = authMiddleware;
