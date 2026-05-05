import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionarUsuarios } from '../../servicios/gestionar-usuarios';
import { ErrorService } from '../../servicios/error.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-componente-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './componente-login.html',
  styleUrl: './componente-login.css'
})
export class ComponenteLogin {
  private auth = inject(GestionarUsuarios);
  private router = inject(Router);
  private errorService = inject(ErrorService);
  error = '';
  codigo = '';
  clave = '';

  onSubmit() {
    this.auth.login(this.codigo, this.clave).subscribe({
      next: () => {
        this.error = '';
        this.errorService.limpiarErrores();
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }
}
