const express = require('express');
const router = express.Router();
const ControladorJuegos = require('../controladores/controladorJuegos');

router.get('/', ControladorJuegos.getJuegos);
router.get('/:id', ControladorJuegos.getJuego);
router.post('/', ControladorJuegos.crearJuego);
router.put('/:id', ControladorJuegos.actualizarJuego);
router.delete('/:id', ControladorJuegos.eliminarJuego);
module.exports = router;