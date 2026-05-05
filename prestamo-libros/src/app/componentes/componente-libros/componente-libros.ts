import { Component, ViewChild, inject } from '@angular/core';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { GestionarUsuarios } from '../../servicios/gestionar-usuarios';
import { CarritoService } from '../../servicios/carrito.service';
import { ErrorService } from '../../servicios/error.service';
import { Libro } from '../../interfaces/libros';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponenteFiltrar } from '../componente-filtrar/componente-filtrar';


@Component({
  selector: 'app-componente-libros',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, RouterModule, ComponenteFiltrar],
  templateUrl: './componente-libros.html',
  styleUrl: './componente-libros.css',
})
export class ComponenteLibros {
  private gestionarLibros = inject(GestionarLibros);
  private auth = inject(GestionarUsuarios);
  private carrito = inject(CarritoService);
  private errorService = inject(ErrorService);

  libros: Libro[] = [];
  dataSource = new MatTableDataSource<Libro>([]);
  displayedColumns: string[] = ['portada', 'titulo', 'autor', 'genero', 'anioPublicacion', 'disponible', 'acciones'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  estaAutenticado = this.auth.estaAutenticado;
  error = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
  }

  cargarLibros(): void {
    this.gestionarLibros.getLibros().subscribe({
      next: (datos) => {
        this.libros = datos;
        this.dataSource = new MatTableDataSource(this.libros);
        this.dataSource.paginator = this.paginator || null;
        this.dataSource.sort = this.sort || null;
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }

  ngOnInit() {
    this.cargarLibros();
  }

  eliminarLibro(id: string | undefined): void {
    if (!id) return;
    if (!confirm('¿Desea eliminar este libro?')) return;
    this.gestionarLibros.bajaLibro(id).subscribe({
      next: () => {
        this.cargarLibros();
      },
      error: (err) => {
        this.error = this.errorService.manejarError(err);
      }
    });
  }

  aniadirAlCarrito(libro: Libro): void {
    if (libro.disponible && libro._id) {
      this.carrito.aniadir(libro);
    }
  }

  estaEnCarrito(id: string | undefined): boolean {
    return this.carrito.estaEnCarrito(id);
  }
}
