import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteRegistro } from './componente-registro';

describe('ComponenteRegistro', () => {
  let component: ComponenteRegistro;
  let fixture: ComponentFixture<ComponenteRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteRegistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
