import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../interfaces/libros';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { CarritoService } from '../../servicios/carrito.service';
import { ErrorService } from '../../servicios/error.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-componente-detalle-libro',
  imports: [FormsModule, UpperCasePipe, RouterModule],
  templateUrl: './componente-detalle-libro.html',
  styleUrl: './componente-detalle-libro.css',
})
export class ComponenteDetalleLibro {
  private route = inject(ActivatedRoute);
  private librosService = inject(GestionarLibros);
  private location = inject(Location);
  private carrito = inject(CarritoService);
  private errorService = inject(ErrorService);

  libro?: Libro;
  error = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getLibro(params['id']);
      }
    });
  }

  getLibro(id: string): void {
    this.librosService.getLibro(id).subscribe({
      next: (libro) => this.libro = libro,
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }

  aniadirAlCarrito(): void {
    if (this.libro && this.libro.disponible && this.libro._id) {
      this.carrito.aniadir(this.libro);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
