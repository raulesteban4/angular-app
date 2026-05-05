import { TestBed } from '@angular/core/testing';

import { GestionarLibros } from './gestionar-libros';

describe('GestionarLibros', () => {
  let service: GestionarLibros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarLibros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
