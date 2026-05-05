const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  email: { type: String, required: true },
  clave: { type: String, required: true },
  nombre: { type: String, required: true },
  perfil: { type: String, default: 'Usuario' },
  estado: { type: String, default: 'Activo' },
  fechaUltimoAcceso: { type: Date, default: Date.now },
  numeroAccesosErroneo: { type: String, default: 0 }
});

module.exports = mongoose.model('Usuario', usuarioSchema);