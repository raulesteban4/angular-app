const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, required: true, trim: true },
  genero: { type: String, trim: true },
  anioPublicacion: { type: Number },
  disponible: { type: Boolean, default: true },
  portada: { type: String, default: '' },
  resumen: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Libro', libroSchema);
