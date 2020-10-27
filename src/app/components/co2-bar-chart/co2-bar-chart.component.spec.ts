import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2BarChartComponent } from './co2-bar-chart.component';

describe('Co2BarChartComponent', () => {
  let component: Co2BarChartComponent;
  let fixture: ComponentFixture<Co2BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2BarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
