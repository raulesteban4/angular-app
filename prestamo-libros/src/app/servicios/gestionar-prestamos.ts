import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Prestamo } from '../interfaces/prestamos';

@Injectable({
  providedIn: 'root'
})
export class GestionarPrestamos {
  private http = inject(HttpClient);
  private apiURL = 'http://localhost:3000/prestamos';

  private _prestamos = signal<Prestamo[]>([]);
  prestamos = this._prestamos.asReadonly();

  cargarPrestamos(filtros?: { devuelto?: boolean; usuario?: string }): Observable<Prestamo[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.devuelto !== undefined) params = params.set('devuelto', String(filtros.devuelto));
      if (filtros.usuario) params = params.set('usuario', filtros.usuario);
    }
    return this.http.get<Prestamo[]>(this.apiURL, { params }).pipe(
      tap(prestamos => this._prestamos.set(prestamos)),
      catchError(err => {
        console.error('Error al cargar prestamos:', err);
        return throwError(() => err);
      })
    );
  }

  getPrestamos(): Observable<Prestamo[]> {
    return this.cargarPrestamos();
  }

  getPrestamo(id: string): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.apiURL}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener prestamo:', err);
        return throwError(() => err);
      })
    );
  }

  crearPrestamo(libroId: string): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiURL, { libroId }).pipe(
      catchError(err => {
        console.error('Error al crear prestamo:', err);
        return throwError(() => err);
      })
    );
  }

  actualizarPrestamo(id: string, devuelto: boolean): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiURL}/${id}`, { devuelto }).pipe(
      tap(prestamoActualizado => {
        const actuales = this._prestamos();
        const index = actuales.findIndex(p => p._id === id);
        if (index > -1) {
          const actualizados = [...actuales];
          actualizados[index] = prestamoActualizado;
          this._prestamos.set(actualizados);
        }
      }),
      catchError(err => {
        console.error('Error al actualizar prestamo:', err);
        return throwError(() => err);
      })
    );
  }

  eliminarPrestamo(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      tap(() => {
        const actuales = this._prestamos();
        this._prestamos.set(actuales.filter(p => p._id !== id));
      }),
      catchError(err => {
        console.error('Error al eliminar prestamo:', err);
        return throwError(() => err);
      })
    );
  }
}
