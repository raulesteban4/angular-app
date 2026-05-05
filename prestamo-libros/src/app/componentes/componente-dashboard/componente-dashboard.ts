import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { GestionarPrestamos } from '../../servicios/gestionar-prestamos';
import { GestionarUsuarios } from '../../servicios/gestionar-usuarios';
import { Libro } from '../../interfaces/libros';
import { Prestamo } from '../../interfaces/prestamos';

@Component({
  selector: 'app-componente-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './componente-dashboard.html',
  styleUrl: './componente-dashboard.css',
})

export class ComponenteDashboard {
  public auth = inject(GestionarUsuarios);
  private librosSvc = inject(GestionarLibros);
  private prestamosSvc = inject(GestionarPrestamos);

  libros: Libro[] = [];
  prestamos: Prestamo[] = [];

  totalLibros = 0;
  totalPrestamos = 0;
  prestamosActivos = 0;
  librosNoDisponibles = 0;

  topLibros: { titulo: string; count: number }[] = [];
  topUsuarios: { usuario: string; count: number }[] = [];
  recentPrestamos: Prestamo[] = [];

  constructor() {
    this.librosSvc.getLibros().subscribe((l) => {
      this.libros = l;
      this.computeStats();
    });

    this.prestamosSvc.getPrestamos().subscribe((p) => {
      this.prestamos = p;
      this.computeStats();
    });
  }

  private computeStats() {
    this.totalLibros = this.libros.length;
    this.totalPrestamos = this.prestamos.length;
    this.prestamosActivos = this.prestamos.filter((x) => !x.devuelto).length;
    this.librosNoDisponibles = this.libros.filter((x) => !x.disponible).length;

    const bookCounts: Record<string, { titulo: string; count: number }> = {};
    for (const p of this.prestamos) {
      const libroId = typeof p.libro === 'object' ? (p.libro as any)._id : p.libro;
      const titulo = typeof p.libro === 'object' ? (p.libro as any).titulo : 'Sin titulo';
      if (!bookCounts[libroId]) bookCounts[libroId] = { titulo, count: 0 };
      bookCounts[libroId].count++;
    }

    this.topLibros = Object.values(bookCounts).sort((a, b) => b.count - a.count).slice(0, 5);

    const userCounts: Record<string, number> = {};
    for (const p of this.prestamos) {
      const u = typeof p.usuario === 'object' ? (p.usuario as any).nombre : (p.usuario || 'Desconocido');
      userCounts[u] = (userCounts[u] || 0) + 1;
    }
    this.topUsuarios = Object.entries(userCounts)
      .map(([usuario, count]) => ({ usuario, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    this.recentPrestamos = [...this.prestamos]
      .sort((a, b) => new Date(b.fechaPrestamo as any).getTime() - new Date(a.fechaPrestamo as any).getTime())
      .slice(0, 5);
  }

  getLibroTitulo(libro: Prestamo['libro']): string {
    return typeof libro === 'object' ? libro.titulo : '';
  }

  getUsuarioNombre(usuario: Prestamo['usuario']): string {
    if (typeof usuario === 'object' && usuario) {
      return (usuario as any).nombre || (usuario as any).codigo || '';
    }
    return typeof usuario === 'string' ? usuario : '';
  }
}
