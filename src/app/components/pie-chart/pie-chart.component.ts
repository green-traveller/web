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

  @Input() pieChartColors =  [
    {
      backgroundColor: ["ff4233", "#e6ff33", "#25a18e", "#9fffcb", "#00a5cf", "#004e64", "#f0f0f0"], //"#7ae582"
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      //pointHoverBackgroundColor: '#9ffcb',
      //pointHoverBorderColor: '#52f75d'
    } 
  ];
  
  @Input() pieChartLegend:boolean;

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
