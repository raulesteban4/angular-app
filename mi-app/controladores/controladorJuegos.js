const Juego = require('../modelos/Juego');

async function getJuegos(req, res) {
  try {
    const juegos = await Juego.find();
    res.status(200).json(juegos);
  } catch (err) {
console.error("Error en getJuegos:", err.message);

    res.status(500).json({"error":"Error al obtener los juegos"});
  }
}

async function getJuego(req, res) {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404) .json({"status":"Error juego no encontrado"});
    res.status(200).json(juego);
  } catch (err) {
    console.error("Error en getJuego:", err.message);
    res.status(500).json({"status":"Error al obtener el juego"});

  }
}

async function crearJuego(req, res) {
  try {
    const newJuego = new Juego(req.body);
    await newJuego.save();
    res.status(201).json(newJuego);
  } catch (err) {
    console.error("Error en crearJuego:", err.message);
    res.status(400).json({"status":"Error al crear el juego"});

  }
}

async function actualizarJuego(req, res) {
  try {
    const updatedJuego = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Para devolver el juego actualizado
    );
    if (!updatedJuego) return res.status(404).json({"status":"Error juego no encontrado"});
    res.status(200).json(updatedJuego);
  } catch (err) {
    console.error("Error en actualizarJuego:", err.message);
    res.status(400).json({"status":"Error al actualizar el juego"});
  }
}

async function eliminarJuego(req, res) {
  try {
    const deletedJuego = await Juego.findByIdAndDelete(req.params.id);
    if (!deletedJuego) return res.status(404).json({"status":"Error juego no encontrado"});
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    console.error("Error en actualizarJuego:", err.message);
    res.status(500).json({"status":"Error al eliminar el juego"});
  }
}

module.exports = { getJuegos, getJuego, crearJuego, actualizarJuego, eliminarJuego };