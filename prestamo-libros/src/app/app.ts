import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponenteMenu } from "./componentes/componente-menu/componente-menu";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponenteMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = 'Prestamo de libros';
}
