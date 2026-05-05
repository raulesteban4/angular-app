import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Libro } from '../interfaces/libros';

@Injectable({
  providedIn: 'root'
})
export class GestionarLibros {
  private http = inject(HttpClient);
  private apiURL = 'http://localhost:3000/libros';

  private _libros = signal<Libro[]>([]);
  libros = this._libros.asReadonly();

  cargarLibros(filtros?: { genero?: string; disponible?: boolean; autor?: string; titulo?: string; sort?: string; order?: string }): Observable<Libro[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.genero) params = params.set('genero', filtros.genero);
      if (filtros.disponible !== undefined) params = params.set('disponible', String(filtros.disponible));
      if (filtros.autor) params = params.set('autor', filtros.autor);
      if (filtros.titulo) params = params.set('titulo', filtros.titulo);
      if (filtros.sort) params = params.set('sort', filtros.sort);
      if (filtros.order) params = params.set('order', filtros.order);
    }
    return this.http.get<Libro[]>(this.apiURL, { params }).pipe(
      tap(libros => this._libros.set(libros)),
      catchError(err => {
        console.error('Error al cargar libros:', err);
        return throwError(() => err);
      })
    );
  }

  getLibros(): Observable<Libro[]> {
    return this.cargarLibros();
  }

  getLibro(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiURL}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener libro:', err);
        return throwError(() => err);
      })
    );
  }

  altaLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiURL, libro).pipe(
      tap(nuevoLibro => {
        const actuales = this._libros();
        this._libros.set([...actuales, nuevoLibro]);
      }),
      catchError(err => {
        console.error('Error al crear libro:', err);
        return throwError(() => err);
      })
    );
  }

  bajaLibro(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      tap(() => {
        const actuales = this._libros();
        this._libros.set(actuales.filter(l => l._id !== id));
      }),
      catchError(err => {
        console.error('Error al eliminar libro:', err);
        return throwError(() => err);
      })
    );
  }

  modificarLibro(id: string, libroModificado: Partial<Libro>): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiURL}/${id}`, libroModificado).pipe(
      tap(libroActualizado => {
        const actuales = this._libros();
        const index = actuales.findIndex(l => l._id === id);
        if (index > -1) {
          const actualizados = [...actuales];
          actualizados[index] = libroActualizado;
          this._libros.set(actualizados);
        }
      }),
      catchError(err => {
        console.error('Error al modificar libro:', err);
        return throwError(() => err);
      })
    );
  }
}
