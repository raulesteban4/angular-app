export interface Libro {
    _id?: string;
    id?: number;
    titulo: string;
    autor: string;
    genero: string;
    anioPublicacion: number;
    disponible: boolean;
    portada: string;
    resumen?: string;
}
