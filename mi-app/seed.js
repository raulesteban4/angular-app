const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./modelos/Usuario');
const Libro = require('./modelos/Libro');
const Prestamo = require('./modelos/Prestamo');

const MONGOURL = 'mongodb://root:example@localhost:27017/prestamos?authSource=admin';

async function seed() {
  try {
    await mongoose.connect(MONGOURL);
    console.log('Conectado a MongoDB');

    await Prestamo.deleteMany({});
    await Libro.deleteMany({});
    await Usuario.deleteMany({});

    const hashedAdmin = await bcrypt.hash('Admin123!', 10);
    const adminUser = new Usuario({
      codigo: 'admin01',
      email: 'admin@ejemplo.com',
      nombre: 'Administrador',
      clave: hashedAdmin,
      perfil: 'Admin',
      estado: 'Activo'
    });
    await adminUser.save();
    console.log('Admin creado: admin01 / Admin123!');

    const hashedUser = await bcrypt.hash('User123!', 10);
    const normalUser = new Usuario({
      codigo: 'user01',
      email: 'user@ejemplo.com',
      nombre: 'Usuario Normal',
      clave: hashedUser,
      perfil: 'Usuario',
      estado: 'Activo'
    });
    await normalUser.save();
    console.log('Usuario normal creado: user01 / User123!');

    const librosData = [
      { titulo: 'Cien anos de soledad', autor: 'Gabriel Garcia Marquez', genero: 'Realismo magico', anioPublicacion: 1967, disponible: false, portada: '/imagenes/cienanosdesoledad.jpg', resumen: 'Relata la historia de la familia Buendia a lo largo de siete generaciones en el mitico pueblo de Macondo.' },
      { titulo: '1984', autor: 'George Orwell', genero: 'Distopia', anioPublicacion: 1949, disponible: true, portada: '/imagenes/1984.jpg', resumen: 'Una sociedad totalitaria vigilada por el Gran Hermano, donde la libertad y la verdad estan prohibidas.' },
      { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', genero: 'Novela clasica', anioPublicacion: 1605, disponible: true, portada: '/imagenes/donquijotedelamancha.jpg', resumen: 'Aventuras de un hidalgo que, influenciado por los libros de caballerias, se convierte en caballero andante.' },
      { titulo: 'El Principito', autor: 'Antoine de Saint-Exupery', genero: 'Fabula', anioPublicacion: 1943, disponible: false, portada: '/imagenes/elprincipito.jpg', resumen: 'Un pequeno principe viaja por planetas y descubre lecciones sobre la amistad, el amor y la vida.' },
      { titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafon', genero: 'Misterio', anioPublicacion: 2001, disponible: true, portada: '/imagenes/lasombradelviento.jpg', resumen: 'Un joven descubre un libro olvidado y se ve envuelto en un misterio literario en la Barcelona de posguerra.' },
      { titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', genero: 'Ciencia ficcion', anioPublicacion: 1953, disponible: true, portada: '/imagenes/Fahrenheit451.jpg', resumen: 'En un futuro donde los libros estan prohibidos, un bombero se rebela y busca preservar el conocimiento.' },
      { titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', genero: 'Romance', anioPublicacion: 1813, disponible: true, portada: '/imagenes/orgulloyprejuicio.jpg', resumen: 'La historia de Elizabeth Bennet y su relacion con el orgulloso senor Darcy, explorando amor y clases sociales.' },
      { titulo: 'Crimen y castigo', autor: 'Fiodor Dostoyevski', genero: 'Drama psicologico', anioPublicacion: 1866, disponible: false, portada: '/imagenes/crimenycastigo.jpg', resumen: 'Un joven estudiante comete un asesinato y lucha con su conciencia y la culpa que lo consume.' },
      { titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', genero: 'Fantasia', anioPublicacion: 1937, disponible: true, portada: '/imagenes/elHobbit.webp', resumen: 'Bilbo Bolson emprende una aventura con enanos para recuperar un tesoro custodiado por un dragon.' },
      { titulo: 'Los juegos del hambre', autor: 'Suzanne Collins', genero: 'Ciencia ficcion', anioPublicacion: 2008, disponible: true, portada: '/imagenes/losjuegosdelhambre.webp', resumen: 'En un futuro distopico, Katniss Everdeen participa en un sangriento juego televisado para sobrevivir.' }
    ];

    const librosGuardados = await Libro.insertMany(librosData);
    console.log(`${librosGuardados.length} libros creados`);

    const usuarioAdmin = await Usuario.findOne({ codigo: 'admin01' });

    const prestamosData = [
      { libro: librosGuardados[0]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-11-01'), fechaDevolucion: new Date('2025-11-15'), devuelto: false },
      { libro: librosGuardados[3]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-10-20'), fechaDevolucion: new Date('2025-11-05'), devuelto: true },
      { libro: librosGuardados[7]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-10-10'), fechaDevolucion: new Date('2025-11-09'), devuelto: false },
      { libro: librosGuardados[2]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-09-15'), fechaDevolucion: new Date('2025-10-15'), devuelto: true },
      { libro: librosGuardados[8]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-11-05'), fechaDevolucion: new Date('2025-11-20'), devuelto: false },
      { libro: librosGuardados[1]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-09-01'), fechaDevolucion: new Date('2025-09-20'), devuelto: true },
      { libro: librosGuardados[4]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-11-02'), fechaDevolucion: new Date('2025-11-18'), devuelto: false },
      { libro: librosGuardados[5]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-08-10'), fechaDevolucion: new Date('2025-08-30'), devuelto: true },
      { libro: librosGuardados[6]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-11-06'), fechaDevolucion: new Date('2025-11-22'), devuelto: false },
      { libro: librosGuardados[9]._id, usuario: usuarioAdmin._id, fechaPrestamo: new Date('2025-10-25'), fechaDevolucion: new Date('2025-11-09'), devuelto: true }
    ];

    await Prestamo.insertMany(prestamosData);
    console.log(`${prestamosData.length} prestamos creados`);

    console.log('Seed completado');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
}

seed();
