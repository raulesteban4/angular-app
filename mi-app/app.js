const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rutasJuegos = require('./rutas/rutasJuegos.js');
const logger = require('./utils/logger.js')
const cookieParser = require('cookie-parser');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const rutasUsuarios = require('./rutas/rutasUsuarios.js');
const rutasLibros = require('./rutas/rutasLibros.js');
const rutasPrestamos = require('./rutas/rutasPrestamos.js');

const MONGOURL = "mongodb://root:example@localhost:27017/prestamos?authSource=admin";

const cors = require('cors');

const app = express();

 app.use(cors({
   origin: 'http://localhost:4200',
   credentials: true
 }));

// Permite recibir JSON en peticiones POST
app.use(express.json());

// Crear un stream para escribir en el archivo de log
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Middleware de logging tipo Apache combinado
app.use(morgan('combined', { stream: logStream }));

// Gestión de sesión con cookies
app.use(cookieParser());

// Configuración de sesión
app.use(expressSession({
  secret: 'mi_clave_super_secreta',
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({
    mongoUrl: MONGOURL // aquí iría la cadena de conexión a mongo que tengas
  }),
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 3000 // 1 hora
  }
}));



// Conexión a MongoDB
mongoose.connect(MONGOURL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/juegos', rutasJuegos);
app.use('/usuarios', rutasUsuarios);
app.use('/libros', rutasLibros);
app.use('/prestamos', rutasPrestamos);

app.use((req, res) => {
  const userIP = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  logger.info(`${userIP} - - "${method} ${url}" PETICION ERRONEA`);
  res.status(404).send('Ruta no encontrada');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));