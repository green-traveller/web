import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Car', 'Motorbike', 'Bus', 'Tram','Train'];
  public pieChartData: number[] = [40, 10, 25 , 5, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartColors =  [
    {
      backgroundColor: ["#7ae582", "#25a18e", "#9fffcb", "#00a5cf", "#004e64"],
      borderColor: ["#7ae582", "#25a18e", "#9fffcb", "#00a5cf", "#004e64"],
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#9ffcb',
      pointHoverBorderColor: '#52f75d'
    } 
  ];
  
  public pieChartLegend:boolean = true

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
