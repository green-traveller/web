import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-km-pie-chart',
  templateUrl: './km-pie-chart.component.html',
  styleUrls: ['./km-pie-chart.component.css']
})
export class KmPieChartComponent implements OnInit {
  
  kmPieChartLabels: string[] = ['Car', 'Motorbike', 'Public Transport', 'Bicycle', 'By Foot'];

  kmPieChartData: number[] = [150, 70, 380, 200, 110];

  kmPieChartColors: object[] = [
    {
      backgroundColor: ["#ff4233d8", "#ff8c00d8", "#e6ff23d8", "#56f2c1d8", "#26c281d8"],
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#9ffcb',
      pointHoverBorderColor: '#52f75d'
    } 
  ];
  
  showDetails = false;

  constructor() { }

  ngOnInit(): void {
  }

}
