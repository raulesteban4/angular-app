import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../servicios/carrito.service';
import { GestionarPrestamos } from '../../servicios/gestionar-prestamos';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { ErrorService } from '../../servicios/error.service';
import { Router } from '@angular/router';
import { Libro } from '../../interfaces/libros';

@Component({
  selector: 'app-componente-carrito',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './componente-carrito.html',
  styleUrl: './componente-carrito.css',
})
export class ComponenteCarrito {
  private carrito = inject(CarritoService);
  private prestamosSvc = inject(GestionarPrestamos);
  private librosSvc = inject(GestionarLibros);
  private errorService = inject(ErrorService);
  private router = inject(Router);

  items = this.carrito.items;
  totalItems = this.carrito.totalItems;
  error = '';
  procesando = false;

  eliminarItem(id: string): void {
    this.carrito.eliminar(id);
  }

  vaciarCarrito(): void {
    this.carrito.vaciar();
  }

  solicitarPrestamos(): void {
    this.procesando = true;
    const items = this.items();
    if (items.length === 0) return;

    let completados = 0;
    let errores = 0;

    items.forEach(item => {
      if (item.libro._id) {
        this.prestamosSvc.crearPrestamo(item.libro._id).subscribe({
          next: () => {
            this.librosSvc.cargarLibros().subscribe();
            completados++;
            if (completados + errores === items.length) {
              this.finalizarProceso(errores);
            }
          },
          error: (err) => {
            errores++;
            this.errorService.manejarError(err);
            if (completados + errores === items.length) {
              this.finalizarProceso(errores);
            }
          }
        });
      }
    });
  }

  private finalizarProceso(errores: number): void {
    this.procesando = false;
    if (errores === 0) {
      this.carrito.vaciar();
      this.router.navigate(['/prestamos']);
    }
  }

  getPortada(libro: Libro): string {
    return libro.portada;
  }
}
