import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupVehicleComponent } from './initial-setup-vehicle.component';

describe('InitialSetupVehicleComponent', () => {
  let component: InitialSetupVehicleComponent;
  let fixture: ComponentFixture<InitialSetupVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
