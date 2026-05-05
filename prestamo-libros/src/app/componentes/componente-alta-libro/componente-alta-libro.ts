import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { Libro } from '../../interfaces/libros';
import { ErrorService } from '../../servicios/error.service';

@Component({
  selector: 'app-componente-alta-libro',
  templateUrl: './componente-alta-libro.html',
  styleUrls: ['./componente-alta-libro.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ComponenteAltaLibro {
  private librosService = inject(GestionarLibros);
  private router = inject(Router);
  private errorService = inject(ErrorService);

  libro: Libro = {
    titulo: '',
    autor: '',
    genero: '',
    anioPublicacion: new Date().getFullYear(),
    disponible: true,
    portada: '',
    resumen: ''
  };

  error = '';

  altaLibro(): void {
    this.librosService.altaLibro(this.libro).subscribe({
      next: () => {
        this.router.navigate(['/libros']);
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }
}
