import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteAltaLibro } from './componente-alta-libro';

describe('ComponenteAltaLibro', () => {
  let component: ComponenteAltaLibro;
  let fixture: ComponentFixture<ComponenteAltaLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteAltaLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteAltaLibro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
