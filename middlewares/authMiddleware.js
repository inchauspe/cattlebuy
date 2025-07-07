// middlewares/authMiddleware.js

export function protegerLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  next();
}

export function protegerPorTipo(tipoPermitido) {
  return (req, res, next) => {
    const usuario = req.session.usuario;
    if (!usuario || usuario.tipo !== tipoPermitido) {
      return res.status(403).send('Acesso negado.');
    }
    next();
  };
}
