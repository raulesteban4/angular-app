import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDashboard } from './componente-dashboard';

describe('ComponenteDashboard', () => {
  let component: ComponenteDashboard;
  let fixture: ComponentFixture<ComponenteDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
