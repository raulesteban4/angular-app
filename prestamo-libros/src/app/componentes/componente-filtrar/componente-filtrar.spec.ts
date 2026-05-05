import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFiltrar } from './componente-filtrar';

describe('ComponenteFiltrar', () => {
  let component: ComponenteFiltrar;
  let fixture: ComponentFixture<ComponenteFiltrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteFiltrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteFiltrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
