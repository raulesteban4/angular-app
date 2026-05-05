import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Prestamo } from '../../interfaces/prestamos';
import { GestionarPrestamos } from '../../servicios/gestionar-prestamos';
import { RouterLink } from '@angular/router';
import { ComponenteFiltrar } from '../componente-filtrar/componente-filtrar';
import { CommonModule, DatePipe } from '@angular/common';
import { ErrorService } from '../../servicios/error.service';
import { Libro } from '../../interfaces/libros';

@Component({
  selector: 'app-componente-prestamos',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, ComponenteFiltrar, MatTableModule, DatePipe],
  templateUrl: './componente-prestamos.html',
  styleUrl: './componente-prestamos.css',
})
export class ComponentePrestamos {
  private gestionarPrestamos = inject(GestionarPrestamos);
  private errorService = inject(ErrorService);

  prestamos: Prestamo[] = [];
  dataSource = new MatTableDataSource<Prestamo>([]);
  error = '';

  ngOnInit() {
    this.cargarPrestamos();

    this.dataSource.filterPredicate = (data, filter: string) => {
      const texto = filter.trim().toLowerCase();
      const libroTitulo = typeof data.libro === 'object' ? (data.libro as Libro).titulo?.toLowerCase() : '';
      const usuarioNombre = typeof data.usuario === 'object' ? (data.usuario as any).nombre?.toLowerCase() : '';
      const usuarioStr = typeof data.usuario === 'string' ? data.usuario.toLowerCase() : '';
      return libroTitulo.includes(texto) || usuarioNombre.includes(texto) || usuarioStr.includes(texto);
    };
  }

  cargarPrestamos(): void {
    this.gestionarPrestamos.getPrestamos().subscribe({
      next: (prestamos) => {
        this.prestamos = prestamos;
        this.dataSource.data = this.prestamos;
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }

  trackById(index: number, item: Prestamo) {
    return item._id || index;
  }

  getLibroTitulo(libro: Prestamo['libro']): string {
    return typeof libro === 'object' ? libro.titulo : '';
  }

  getLibroPortada(libro: Prestamo['libro']): string {
    return typeof libro === 'object' ? libro.portada : '';
  }

  getUsuarioNombre(usuario: Prestamo['usuario']): string {
    if (typeof usuario === 'object' && usuario) {
      return (usuario as any).nombre || (usuario as any).codigo || '';
    }
    return typeof usuario === 'string' ? usuario : '';
  }

  getLibroId(libro: Prestamo['libro']): string {
    return typeof libro === 'object' ? libro._id || '' : '';
  }

  marcarDevuelto(prestamo: Prestamo): void {
    if (!prestamo._id) return;
    this.gestionarPrestamos.actualizarPrestamo(prestamo._id, !prestamo.devuelto).subscribe({
      next: () => {
        this.cargarPrestamos();
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }
}
