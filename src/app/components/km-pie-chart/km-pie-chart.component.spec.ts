import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmPieChartComponent } from './km-pie-chart.component';

describe('KmPieChartComponent', () => {
  let component: KmPieChartComponent;
  let fixture: ComponentFixture<KmPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
