import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GestionarUsuarios } from './servicios/gestionar-usuarios';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(GestionarUsuarios);
  const router = inject(Router);

  if (auth.esAdmin()) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
