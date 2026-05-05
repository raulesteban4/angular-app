const express = require('express');
const router = express.Router();
const ControladorLibros = require('../controladores/controladorLibros');
const authMiddleware = require('../utils/authMiddleware2');
const { validarCrearLibro, validarId } = require('../utils/validateLibros');

router.get('/', authMiddleware, ControladorLibros.getLibros);
router.get('/:id', [authMiddleware, validarId], ControladorLibros.getLibro);
router.post('/', [authMiddleware, validarCrearLibro], ControladorLibros.crearLibro);
router.put('/:id', [authMiddleware, validarId], ControladorLibros.actualizarLibro);
router.delete('/:id', [authMiddleware, validarId], ControladorLibros.eliminarLibro);

module.exports = router;
