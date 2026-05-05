const { body, param } = require('express-validator');

validarCrearLibro = [
  body('titulo')
    .trim()
    .notEmpty().withMessage('El titulo es obligatorio')
    .isLength({ min: 1 }).withMessage('El titulo no puede estar vacio')
    .escape(),
  body('autor')
    .trim()
    .notEmpty().withMessage('El autor es obligatorio')
    .isLength({ min: 1 }).withMessage('El autor no puede estar vacio')
    .escape(),
  body('genero')
    .optional()
    .trim()
    .escape(),
  body('anioPublicacion')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() + 1 }).withMessage('Año de publicacion invalido'),
  body('portada')
    .optional()
    .trim()
    .escape(),
  body('resumen')
    .optional()
    .trim()
    .escape()
];

validarId = [
  param('id')
    .isMongoId().withMessage('ID invalido')
];

module.exports = { validarCrearLibro, validarId };
