import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDetalleLibro } from './componente-detalle-libro';

describe('ComponenteDetalleLibro', () => {
  let component: ComponenteDetalleLibro;
  let fixture: ComponentFixture<ComponenteDetalleLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteDetalleLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteDetalleLibro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
