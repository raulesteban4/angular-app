const authMiddleware = (req, res, next) => {
  if (!req.session.usuarioId) {
    return res.status(401).json({ message: 'No autenticado. Por favor, haz login.' });
  }
  req.usuarioId = req.session.usuarioId;
  next();
};

module.exports = authMiddleware;
