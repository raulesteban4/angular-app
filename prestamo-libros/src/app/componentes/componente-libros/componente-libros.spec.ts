import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteLibros } from './componente-libros';

describe('ComponenteLibros', () => {
  let component: ComponenteLibros;
  let fixture: ComponentFixture<ComponenteLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteLibros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteLibros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
