const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios2.js');
const authMiddleware = require('../utils/authMiddleware2.js');
const { validarRegistro, validarLogin } = require('../utils/validateUsuarios.js');

router.post('/registro', validarRegistro, ControladorUsuarios.usuarioRegistro);
router.post('/login', validarLogin, ControladorUsuarios.usuarioLogin);
router.post('/logout', ControladorUsuarios.usuarioLogout);
router.get('/perfil', authMiddleware, ControladorUsuarios.getPerfil);

module.exports = router;
