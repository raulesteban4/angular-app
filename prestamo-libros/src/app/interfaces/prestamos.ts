import { Libro } from './libros';
import { Usuario } from './usuario';

export interface Prestamo {
    _id?: string;
    id?: number;
    libro: Libro | string;
    usuario: string | Usuario;
    fechaPrestamo: Date | string;
    fechaDevolucion: Date | string;
    devuelto: boolean;
}
