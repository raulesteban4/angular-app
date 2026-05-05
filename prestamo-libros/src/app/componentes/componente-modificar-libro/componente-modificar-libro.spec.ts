import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteModificarLibro } from './componente-modificar-libro';

describe('ComponenteModificarLibro', () => {
  let component: ComponenteModificarLibro;
  let fixture: ComponentFixture<ComponenteModificarLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteModificarLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteModificarLibro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
