const express = require('express');
const router = express.Router();
const ControladorPrestamos = require('../controladores/controladorPrestamos');
const authMiddleware = require('../utils/authMiddleware2');
const { validarCrearPrestamo, validarActualizarPrestamo, validarId } = require('../utils/validatePrestamos');

router.get('/', authMiddleware, ControladorPrestamos.getPrestamos);
router.get('/:id', [authMiddleware, validarId], ControladorPrestamos.getPrestamo);
router.post('/', [authMiddleware, validarCrearPrestamo], ControladorPrestamos.crearPrestamo);
router.put('/:id', [authMiddleware, validarId, validarActualizarPrestamo], ControladorPrestamos.actualizarPrestamo);
router.delete('/:id', [authMiddleware, validarId], ControladorPrestamos.eliminarPrestamo);

module.exports = router;
