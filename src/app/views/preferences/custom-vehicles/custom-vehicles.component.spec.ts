import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVehiclesComponent } from './custom-vehicles.component';

describe('CustomVehiclesComponent', () => {
  let component: CustomVehiclesComponent;
  let fixture: ComponentFixture<CustomVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
