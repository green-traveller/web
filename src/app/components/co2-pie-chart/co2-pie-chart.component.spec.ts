import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2PieChartComponent } from './co2-pie-chart.component';

describe('Co2PieChartComponent', () => {
  let component: Co2PieChartComponent;
  let fixture: ComponentFixture<Co2PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2PieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
