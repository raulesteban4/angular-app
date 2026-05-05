import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePrestamos } from './componente-prestamos';

describe('ComponentePrestamos', () => {
  let component: ComponentePrestamos;
  let fixture: ComponentFixture<ComponentePrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentePrestamos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentePrestamos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
