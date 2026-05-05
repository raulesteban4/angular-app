const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fechaPrestamo: { type: Date, default: Date.now },
  fechaDevolucion: { type: Date },
  devuelto: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Prestamo', prestamoSchema);
