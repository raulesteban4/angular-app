import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionarLibros } from '../../servicios/gestionar-libros';
import { GestionarUsuarios } from '../../servicios/gestionar-usuarios';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-componente-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, RouterLink, MatBadgeModule],
  templateUrl: './componente-menu.html',
  styleUrl: './componente-menu.css',
})
export class ComponenteMenu {
  private auth = inject(GestionarUsuarios);
  private router = inject(Router);
  private carrito = inject(CarritoService);

  estaAutenticado = this.auth.estaAutenticado;
  esAdmin = this.auth.esAdmin;
  totalCarrito = this.carrito.totalItems;

  logout() {
    this.carrito.vaciar();
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
