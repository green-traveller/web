import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-co2-bar-chart',
  templateUrl: './co2-bar-chart.component.html',
  styleUrls: ['./co2-bar-chart.component.css']
})
export class Co2BarChartComponent implements OnInit {
  
  co2BarChartLabels: string[] = ['May', 'June', 'July', 'August', 'September', 'October'];

  co2BarChartData: ChartDataSets[] = [
    { data: [2.5, 2.25, 1.9, 2.7, 2.55, 2.1], label: 'CO₂ (avg kg/day)' },
  ];
  
  co2BarChartColors = [
    { backgroundColor: '#ff3311' },
    { backgroundColor: 'green' },
  ];
  
  showDetails = false;

  constructor() { }

  ngOnInit(): void {
  }

}
