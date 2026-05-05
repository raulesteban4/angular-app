import { TestBed } from '@angular/core/testing';

import { GestionarUsuarios } from './gestionar-usuarios';

describe('GestionarUsuarios', () => {
  let service: GestionarUsuarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarUsuarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
