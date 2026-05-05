const Prestamo = require('../modelos/Prestamo');
const Libro = require('../modelos/Libro');
const logger = require('../utils/logger.js');
const { validationResult } = require('express-validator');

async function getPrestamos(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const { devuelto, usuario } = req.query;
    let filtro = {};
    if (devuelto !== undefined) filtro.devuelto = devuelto === 'true';
    if (usuario) filtro.usuario = usuario;
    const prestamos = await Prestamo.find(filtro).populate('libro').populate('usuario', 'codigo nombre email');
    logger.info(`${userIP} - - "${method} ${url}" GET prestamos: ${prestamos.length} encontrados`);
    res.status(200).json(prestamos);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en getPrestamos: ${err.message}`);
    res.status(500).json({ error: 'Error al obtener los prestamos' });
  }
}

async function getPrestamo(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const prestamo = await Prestamo.findById(req.params.id).populate('libro').populate('usuario', 'codigo nombre email');
    if (!prestamo) {
      logger.info(`${userIP} - - "${method} ${url}" GET prestamo: no encontrado`);
      return res.status(404).json({ error: 'Prestamo no encontrado' });
    }
    res.status(200).json(prestamo);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en getPrestamo: ${err.message}`);
    res.status(500).json({ error: 'Error al obtener el prestamo' });
  }
}

async function crearPrestamo(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { libroId } = req.body;
    const usuarioId = req.usuarioId;
    if (!libroId) {
      return res.status(400).json({ error: 'El libro es obligatorio' });
    }
    const libro = await Libro.findById(libroId);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    if (!libro.disponible) {
      return res.status(400).json({ error: 'El libro no esta disponible' });
    }
    const nuevoPrestamo = new Prestamo({
      libro: libroId,
      usuario: usuarioId,
      fechaDevolucion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });
    await nuevoPrestamo.save();
    libro.disponible = false;
    await libro.save();
    logger.info(`${userIP} - - "${method} ${url}" CREAR prestamo: ${nuevoPrestamo._id} creado`);
    res.status(201).json(nuevoPrestamo);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en crearPrestamo: ${err.message}`);
    res.status(400).json({ error: 'Error al crear el prestamo' });
  }
}

async function actualizarPrestamo(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const { devuelto } = req.body;
    const prestamo = await Prestamo.findById(req.params.id);
    if (!prestamo) {
      return res.status(404).json({ error: 'Prestamo no encontrado' });
    }
    if (devuelto === true && !prestamo.devuelto) {
      prestamo.devuelto = true;
      await prestamo.save();
      await Libro.findByIdAndUpdate(prestamo.libro, { disponible: true });
    }
    logger.info(`${userIP} - - "${method} ${url}" ACTUALIZAR prestamo: ${prestamo._id} actualizado`);
    res.status(200).json(prestamo);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en actualizarPrestamo: ${err.message}`);
    res.status(400).json({ error: 'Error al actualizar el prestamo' });
  }
}

async function eliminarPrestamo(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const deletedPrestamo = await Prestamo.findByIdAndDelete(req.params.id);
    if (!deletedPrestamo) {
      return res.status(404).json({ error: 'Prestamo no encontrado' });
    }
    if (!deletedPrestamo.devuelto) {
      await Libro.findByIdAndUpdate(deletedPrestamo.libro, { disponible: true });
    }
    logger.info(`${userIP} - - "${method} ${url}" ELIMINAR prestamo: ${deletedPrestamo._id} eliminado`);
    res.status(200).json({ message: 'Prestamo eliminado correctamente' });
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en eliminarPrestamo: ${err.message}`);
    res.status(500).json({ error: 'Error al eliminar el prestamo' });
  }
}

module.exports = { getPrestamos, getPrestamo, crearPrestamo, actualizarPrestamo, eliminarPrestamo };
