const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

// Formato tipo Apache
const apacheFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), apacheFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }) // Guarda en archivo
  ],
});

module.exports = logger