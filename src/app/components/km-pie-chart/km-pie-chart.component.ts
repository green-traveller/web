import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-km-pie-chart',
  templateUrl: './km-pie-chart.component.html',
  styleUrls: ['./km-pie-chart.component.css']
})
export class KmPieChartComponent implements OnInit {

  kmCar = this.dataService.getDistanceLast30DaysByVehicle(this.routeService, 'car');  

  kmMotorcycle = this.dataService.getDistanceLast30DaysByVehicle(this.routeService, 'motorcycle');  

  kmPublicTransport = this.dataService.getDistanceLast30DaysByVehicle(this.routeService, 'train');

  kmBicycle = this.dataService.getDistanceLast30DaysByVehicle(this.routeService, 'bicycle');  

  kmWalking = this.dataService.getDistanceLast30DaysByVehicle(this.routeService, 'walking');

  kmPieChartData: number[] = [this.kmCar, this.kmMotorcycle, this.kmPublicTransport, this.kmBicycle, this.kmWalking];

  kmSum: number = this.kmPieChartData.reduce((pv, cv) => pv + cv, 0);
  
  emptyPieChartData: number[] = [1];
  
  kmPieChartLabels: string[] = ['Car', 'Motorbike', 'Public Transport', 'Bicycle', 'By Foot'];

  emptyPieChartLabels: string[] = ['No routes in the last 30 days'];

  kmPieChartColors: object[] = [
    {
      backgroundColor: ["#ff6961", "#ffb447", "#efed86", "#b0c988", "#85bb88"],
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#9ffcb',
      pointHoverBorderColor: '#52f75d'
    } 
  ];

  emptyPieChartColors:  object[] = [
    {
      backgroundColor: '#f0f0f0',
    } 
  ];

  kmPieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },

    tooltips: {
      enabled: true,
      bodyFontSize: 20,
      xPadding: 10,
      yPadding: 10,
      backgroundColor: 'rgba(32, 75, 87, 0.8)',
      bodyFontColor: '#fff',
      callbacks: {
       label(tooltipItem, data): string[] {
        const label = data.labels[tooltipItem.index];
        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].valueOf().toString();

        return [` ${label}: ${formatNumber(Number(value), 'en_US', '1.2-2')} km`];
       },
      },
     },

    plugins: {},
    maintainAspectRatio: false
   };
  
  showDetails = false;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
  }

}
