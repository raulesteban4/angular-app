const { body, param } = require('express-validator');

validarCrearPrestamo = [
  body('libroId')
    .notEmpty().withMessage('El libro es obligatorio')
    .isMongoId().withMessage('ID de libro invalido')
];

validarActualizarPrestamo = [
  body('devuelto')
    .isBoolean().withMessage('El campo devuelto debe ser booleano')
];

validarId = [
  param('id')
    .isMongoId().withMessage('ID invalido')
];

module.exports = { validarCrearPrestamo, validarActualizarPrestamo, validarId };
