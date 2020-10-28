import { Component, OnInit } from '@angular/core';
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
  
  kmPieChartLabels: string[] = ['Car', 'Motorbike', 'Public Transport', 'Bicycle', 'By Foot'];

  kmPieChartColors: object[] = [
    {
      backgroundColor: ["#ff4233d8", "#ff6c00d8", "#efd600d8", "#56f2c1d8", "#26c281d8"],
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#9ffcb',
      pointHoverBorderColor: '#52f75d'
    } 
  ];
  
  showDetails = false;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
    console.log(this.kmPieChartData);
  }

}
