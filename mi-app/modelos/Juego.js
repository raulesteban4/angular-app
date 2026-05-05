const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: String,
  year: Number
});

module.exports = mongoose.model('Juego', juegoSchema);