import { Injectable, signal, computed } from '@angular/core';
import { Libro } from '../interfaces/libros';

export interface ItemCarrito {
  libro: Libro;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private _items = signal<ItemCarrito[]>([]);
  items = this._items.asReadonly();

  totalItems = computed(() => this._items().reduce((acc, item) => acc + item.cantidad, 0));

  estaEnCarrito(id: string | undefined): boolean {
    if (!id) return false;
    return this._items().some(item => item.libro._id === id);
  }

  aniadir(libro: Libro) {
    const actuales = this._items();
    const existente = actuales.find(item => item.libro._id === libro._id);
    if (existente) {
      const actualizados = actuales.map(item =>
        item.libro._id === libro._id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      this._items.set(actualizados);
    } else {
      this._items.set([...actuales, { libro, cantidad: 1 }]);
    }
  }

  eliminar(id: string) {
    this._items.update(items => items.filter(item => item.libro._id !== id));
  }

  vaciar() {
    this._items.set([]);
  }
}
