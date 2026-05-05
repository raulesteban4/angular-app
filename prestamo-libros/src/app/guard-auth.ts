import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GestionarUsuarios } from './servicios/gestionar-usuarios';

export const authGuard: CanActivateFn = () => {
  const auth = inject(GestionarUsuarios);
  if (auth.estaAutenticado()) {
    return true;
  }
  // Si no está autenticado, redirigir al login
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
