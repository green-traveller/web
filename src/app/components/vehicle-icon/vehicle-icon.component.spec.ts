import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleIconComponent } from './vehicle-icon.component';

describe('VehicleIconComponent', () => {
  let component: VehicleIconComponent;
  let fixture: ComponentFixture<VehicleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
