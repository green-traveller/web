import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2GoalsComponent } from './co2-goals.component';

describe('Co2GoalsComponent', () => {
  let component: Co2GoalsComponent;
  let fixture: ComponentFixture<Co2GoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2GoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2GoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
