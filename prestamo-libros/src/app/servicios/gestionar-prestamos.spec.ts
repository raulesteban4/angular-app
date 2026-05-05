import { TestBed } from '@angular/core/testing';

import { GestionarPrestamos } from './gestionar-prestamos';

describe('GestionarPrestamos', () => {
  let service: GestionarPrestamos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarPrestamos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
