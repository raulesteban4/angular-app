const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./modelos/Usuario');
const Libro = require('./modelos/Libro');

const MONGOURL = 'mongodb://root:example@localhost:27017/prestamos?authSource=admin';

async function seed() {
  try {
    await mongoose.connect(MONGOURL);
    console.log('Conectado a MongoDB');

    await Usuario.deleteMany({});
    await Libro.deleteMany({});

    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    const adminUser = new Usuario({
      codigo: 'admin01',
      email: 'admin@ejemplo.com',
      nombre: 'Administrador',
      clave: hashedPassword,
      perfil: 'Admin',
      estado: 'Activo'
    });
    await adminUser.save();
    console.log('Admin creado: admin01 / Admin123!');

    const hashedPassword2 = await bcrypt.hash('User123!', 10);
    const normalUser = new Usuario({
      codigo: 'user01',
      email: 'user@ejemplo.com',
      nombre: 'Usuario Normal',
      clave: hashedPassword2,
      perfil: 'Usuario',
      estado: 'Activo'
    });
    await normalUser.save();
    console.log('Usuario normal creado: user01 / User123!');

    const libros = [
      { titulo: 'Cien años de soledad', autor: 'Gabriel Garcia Marquez', genero: 'Novela', anioPublicacion: 1967, disponible: true, portada: '/imagenes/libro1.jpg', resumen: 'Una obra maestra de la literatura latinoamericana.' },
      { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', genero: 'Novela', anioPublicacion: 1605, disponible: true, portada: '/imagenes/libro2.jpg', resumen: 'La historia del ingenioso hidalgo.' },
      { titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafon', genero: 'Misterio', anioPublicacion: 2001, disponible: true, portada: '/imagenes/libro3.jpg', resumen: 'Un misterio literario en la Barcelona de posguerra.' },
      { titulo: 'Rayuela', autor: 'Julio Cortazar', genero: 'Novela', anioPublicacion: 1963, disponible: true, portada: '/imagenes/libro4.jpg', resumen: 'Una novela revolucionaria en su estructura.' },
      { titulo: 'El amor en los tiempos del colera', autor: 'Gabriel Garcia Marquez', genero: 'Romance', anioPublicacion: 1985, disponible: true, portada: '/imagenes/libro5.jpg', resumen: 'Una historia de amor que dura mas de cincuenta años.' },
      { titulo: '1984', autor: 'George Orwell', genero: 'Ciencia ficcion', anioPublicacion: 1949, disponible: true, portada: '/imagenes/libro6.jpg', resumen: 'Una distopia sobre el totalitarismo.' },
      { titulo: 'El principito', autor: 'Antoine de Saint-Exupery', genero: 'Fabula', anioPublicacion: 1943, disponible: true, portada: '/imagenes/libro7.jpg', resumen: 'Un cuento poetico sobre la naturaleza humana.' },
      { titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', genero: 'Ciencia ficcion', anioPublicacion: 1953, disponible: true, portada: '/imagenes/libro8.jpg', resumen: 'Una sociedad donde los libros estan prohibidos.' },
      { titulo: 'Crónica de una muerte anunciada', autor: 'Gabriel Garcia Marquez', genero: 'Novela', anioPublicacion: 1981, disponible: true, portada: '/imagenes/libro9.jpg', resumen: 'La reconstruccion de un asesinato anunciado.' },
      { titulo: 'La casa de los espiritus', autor: 'Isabel Allende', genero: 'Novela', anioPublicacion: 1982, disponible: true, portada: '/imagenes/libro10.jpg', resumen: 'La saga de una familia latinoamericana.' }
    ];

    await Libro.insertMany(libros);
    console.log(`${libros.length} libros creados`);

    console.log('Seed completado');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
}

seed();
