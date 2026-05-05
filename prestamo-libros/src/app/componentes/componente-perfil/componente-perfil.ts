import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GestionarUsuarios } from '../../servicios/gestionar-usuarios';
import { RespuestaPerfil } from '../../interfaces/respuestaAuth';
import { ErrorService } from '../../servicios/error.service';

@Component({
  selector: 'app-componente-perfil',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './componente-perfil.html',
  styleUrl: './componente-perfil.css',
})
export class ComponentePerfil {
  private auth = inject(GestionarUsuarios);
  private errorService = inject(ErrorService);

  perfil: RespuestaPerfil['user'] | null = null;
  error = '';

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.auth.obtenerPerfil().subscribe({
      next: (response) => {
        this.perfil = response.user;
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }
}
