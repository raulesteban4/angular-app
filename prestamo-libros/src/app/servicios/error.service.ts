import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _errores = signal<string[]>([]);
  errores = this._errores.asReadonly();
  hayErrores = computed(() => this._errores().length > 0);
  ultimoError = computed(() => {
    const errs = this._errores();
    return errs.length > 0 ? errs[errs.length - 1] : null;
  });

  añadirError(mensaje: string) {
    this._errores.update(errores => [...errores, mensaje]);
  }

  limpiarErrores() {
    this._errores.set([]);
  }

  manejarError(error: any): string {
    let mensaje = 'Ha ocurrido un error inesperado';
    if (error.error && error.error.error) {
      mensaje = error.error.error;
    } else if (error.error && error.error.message) {
      mensaje = error.error.message;
    } else if (error.message) {
      mensaje = error.message;
    } else if (error.status === 401) {
      mensaje = 'No autorizado. Por favor, inicia sesión.';
    } else if (error.status === 403) {
      mensaje = 'Acceso denegado. No tienes permisos.';
    } else if (error.status === 404) {
      mensaje = 'Recurso no encontrado.';
    } else if (error.status === 500) {
      mensaje = 'Error del servidor. Intentalo de nuevo mas tarde.';
    }
    this.añadirError(mensaje);
    return mensaje;
  }
}
