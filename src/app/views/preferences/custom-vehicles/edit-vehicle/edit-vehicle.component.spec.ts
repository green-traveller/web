import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleComponent } from './edit-vehicle.component';

describe('EditVehicleComponent', () => {
  let component: EditVehicleComponent;
  let fixture: ComponentFixture<EditVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
