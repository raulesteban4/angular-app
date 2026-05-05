const { body } = require('express-validator');

validarRegistro = [
  body('codigo')
    .trim()
    .notEmpty().withMessage('El codigo es obligatorio')
    .isLength({ min: 3 }).withMessage('El codigo debe tener al menos 3 caracteres')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('clave')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .escape(),
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .escape()
];

validarLogin = [
  body('codigo')
    .trim()
    .notEmpty().withMessage('El codigo es obligatorio')
    .escape(),
  body('clave')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .escape(),
];

module.exports =  { validarLogin, validarRegistro}