import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
import { RespuestaAuth, RespuestaPerfil } from '../interfaces/respuestaAuth';

@Injectable({
  providedIn: 'root'
})
export class GestionarUsuarios {
  private http = inject(HttpClient);

  private apiURL = 'http://localhost:3000/usuarios';

  private _usuarioActual = signal<{ codigo: string; nombre: string; email: string; perfil: string } | null>(null);
  usuarioActual = this._usuarioActual.asReadonly();

  estaAutenticado = computed(() => this.usuarioActual() !== null);

  esAdmin = computed(() => this.usuarioActual()?.perfil === 'Admin');

  constructor() {
    this.verificarSesion();
  }

  verificarSesion() {
    this.http.get<RespuestaPerfil>(this.apiURL + '/perfil', { withCredentials: true }).pipe(
      tap(response => {
        this._usuarioActual.set({
          codigo: response.user.codigo,
          nombre: response.user.nombre,
          email: response.user.email,
          perfil: response.user.perfil
        });
      }),
      catchError(err => {
        this._usuarioActual.set(null);
        return of(null);
      })
    ).subscribe();
  }

  registro(codigo: string, clave: string, nombre: string, email: string) {
    return this.http.post<RespuestaAuth>(
      this.apiURL + '/registro',
      { codigo, clave, nombre, email },
      { withCredentials: true }
    ).pipe(
      catchError(err => {
        console.error('Error en registro:', err);
        return of(false as any);
      })
    );
  }

  login(codigo: string, clave: string) {
    return this.http.post<RespuestaAuth>(
      this.apiURL + '/login',
      { codigo, clave },
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.http.get<RespuestaPerfil>(this.apiURL + '/perfil', { withCredentials: true }).pipe(
          tap(response => {
            this._usuarioActual.set({
              codigo: response.user.codigo,
              nombre: response.user.nombre,
              email: response.user.email,
              perfil: response.user.perfil
            });
          })
        ).subscribe();
      }),
      catchError(err => {
        console.error('Error en login:', err);
        return throwError(() => err);
      })
    );
  }

  logout() {
    return this.http.post<void>(
      this.apiURL + '/logout',
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this._usuarioActual.set(null);
      }),
      catchError(err => {
        console.error('Error en logout:', err);
        return throwError(() => err);
      })
    );
  }

  obtenerPerfil() {
    return this.http.get<RespuestaPerfil>(this.apiURL + '/perfil', { withCredentials: true });
  }
}
