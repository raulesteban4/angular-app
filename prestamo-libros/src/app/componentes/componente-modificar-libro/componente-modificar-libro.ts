import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { Libro } from '../../interfaces/libros';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../servicios/error.service';

@Component({
  selector: 'app-componente-modificar-libro',
  imports: [FormsModule, CommonModule],
  templateUrl: './componente-modificar-libro.html',
  styleUrl: './componente-modificar-libro.css',
})
export class ComponenteModificarLibro {
  private route = inject(ActivatedRoute);
  private librosService = inject(GestionarLibros);
  private location = inject(Location);
  private errorService = inject(ErrorService);

  libro?: Libro;
  error = '';
  libroId = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.libroId = params['id'];
        this.getLibro();
      }
    });
  }

  getLibro(): void {
    this.librosService.getLibro(this.libroId).subscribe({
      next: (libro) => this.libro = libro,
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }

  guardar(): void {
    if (this.libro) {
      this.librosService.modificarLibro(this.libroId, {
        titulo: this.libro.titulo,
        autor: this.libro.autor,
        genero: this.libro.genero,
        anioPublicacion: this.libro.anioPublicacion,
        disponible: this.libro.disponible,
        portada: this.libro.portada,
        resumen: this.libro.resumen
      }).subscribe({
        next: () => {
          this.goBack();
        },
        error: (err) => {
          this.error = this.errorService.manejarError(err);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
