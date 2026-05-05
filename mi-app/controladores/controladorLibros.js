const Libro = require('../modelos/Libro');
const logger = require('../utils/logger.js');
const { validationResult } = require('express-validator');

async function getLibros(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const { genero, disponible, autor, titulo, sort, order } = req.query;
    let filtro = {};
    if (genero) filtro.genero = new RegExp(genero, 'i');
    if (disponible !== undefined) filtro.disponible = disponible === 'true';
    if (autor) filtro.autor = new RegExp(autor, 'i');
    if (titulo) filtro.titulo = new RegExp(titulo, 'i');
    let query = Libro.find(filtro);
    if (sort) {
      const sortOrder = order === 'desc' ? -1 : 1;
      query = query.sort({ [sort]: sortOrder });
    }
    const libros = await query;
    logger.info(`${userIP} - - "${method} ${url}" GET libros: ${libros.length} encontrados`);
    res.status(200).json(libros);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en getLibros: ${err.message}`);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
}

async function getLibro(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      logger.info(`${userIP} - - "${method} ${url}" GET libro: no encontrado`);
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    logger.info(`${userIP} - - "${method} ${url}" GET libro: encontrado`);
    res.status(200).json(libro);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en getLibro: ${err.message}`);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
}

async function crearLibro(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { titulo, autor, genero, anioPublicacion, disponible, portada, resumen } = req.body;
    if (!titulo || !autor) {
      return res.status(400).json({ error: 'El titulo y el autor son obligatorios' });
    }
    const newLibro = new Libro({ titulo, autor, genero, anioPublicacion, disponible, portada, resumen });
    await newLibro.save();
    logger.info(`${userIP} - - "${method} ${url}" CREAR libro: ${newLibro._id} creado`);
    res.status(201).json(newLibro);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en crearLibro: ${err.message}`);
    res.status(400).json({ error: 'Error al crear el libro' });
  }
}

async function actualizarLibro(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const updatedLibro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLibro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    logger.info(`${userIP} - - "${method} ${url}" ACTUALIZAR libro: ${updatedLibro._id} actualizado`);
    res.status(200).json(updatedLibro);
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en actualizarLibro: ${err.message}`);
    res.status(400).json({ error: 'Error al actualizar el libro' });
  }
}

async function eliminarLibro(req, res) {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  try {
    const deletedLibro = await Libro.findByIdAndDelete(req.params.id);
    if (!deletedLibro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    const Prestamo = require('../modelos/Prestamo');
    await Prestamo.deleteMany({ libro: req.params.id });
    logger.info(`${userIP} - - "${method} ${url}" ELIMINAR libro: ${deletedLibro._id} eliminado`);
    res.status(200).json({ message: 'Libro eliminado correctamente' });
  } catch (err) {
    logger.error(`${userIP} - - "${method} ${url}" Error en eliminarLibro: ${err.message}`);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
}

module.exports = { getLibros, getLibro, crearLibro, actualizarLibro, eliminarLibro };
