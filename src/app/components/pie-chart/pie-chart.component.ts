import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  
  pieChartType: ChartType = 'pie';
  
  pieChartOptions = {    
    responsive: true,
    legend: {
        display: true,
        position: 'bottom'
      },
    maintainAspectRatio: false       
  }

  @Input() pieChartLabels: string[];

  @Input() pieChartData: number[];  

  @Input() pieChartColors;  
  
  @Input() pieChartLegend: boolean;

  // events
  public chartClicked(e:any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
