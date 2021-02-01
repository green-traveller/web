import { formatNumber } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'src/app/models/alert';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-co2-pie-chart',
  templateUrl: './co2-pie-chart.component.html',
  styleUrls: ['./co2-pie-chart.component.css']
})
export class Co2PieChartComponent implements OnInit {

  @ViewChild( 'co2PieChart' ) co2PieChart: PieChartComponent;

  // average co2-emissions [kg] per day caused by transport (excluding air travel) by a German
  avgTranspCO2German = 4.4;

  // average co2 emissions per day in kg over the last 30 days from different means of transport
  currentCo2Car = this.dataService.getCo2Last30DaysByVehicle(this.routeService, 'car') / 30;

  currentCo2Motorcycle = this.dataService.getCo2Last30DaysByVehicle(this.routeService, 'motorcycle') / 30;

  currentCo2PublicTransport = this.dataService.getCo2Last30DaysByVehicle(this.routeService, 'train') / 30;

  // average co2 emissions per day in kg over the last 30 days from different means of transport
  currentCo2Data: number[] = [this.currentCo2Car, this.currentCo2Motorcycle, this.currentCo2PublicTransport];

  currentCo2SumPerDay = this.dataService.getTotalCo2Last30Days(this.routeService) / 30;

  currentCo2RestBudget: number = this.avgTranspCO2German - this.currentCo2SumPerDay;

  // Properties: General Co2-PieChart (All co2 summed up)
  co2PieChartData: number[]  = this.getCo2PieChartData();

  co2PieChartLabels: string[] = this.getCo2PieChartLabels();

  co2PieChartColors: object[] =  [
    {
        backgroundColor: ['#ff6961', '#f0f0f0'],
        borderColor: '#fff',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff'
      }
    ];

  // Properties: Co2-PieChart Details
  co2PieChartDetailsData: number[]  = this.getCo2PieChartDetailsData();

  co2PieChartDetailsLabels: string[] = this.getCo2PieChartDetailsLabels();

  co2PieChartDetailsColors: object[] =  [
    {
      backgroundColor: ['#ff6961', '#ffb447', '#efed86', '#f0f0f0'],
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff'
    }
  ];

  // Properties: Co2-Alert
  co2Alert: Alert = {
    type: this.getCo2AlertType(),
    message: this.getCo2AlertMessage()
  };

  // Flag for Co2-Alert
  showCo2Alert = true;

  // Flag for Details-View
  showDetails = false;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
  }

  getCo2PieChart(): PieChartComponent {
    return this.co2PieChart;
  }

  getBudgetPercent(): string {
    const value = this.currentCo2SumPerDay * 100 / this.avgTranspCO2German;

    return `${formatNumber(value, 'en_US', '1.2-2')}%`;
  }

  // Methods: General Co2-PieChart (All co2 summed up)
  getCo2PieChartData(): number[] {
    if (this.currentCo2RestBudget > 0) {
      return [this.currentCo2SumPerDay, this.currentCo2RestBudget];
    }
    else {
      return [this.currentCo2SumPerDay];
    }
  }

  getCo2PieChartLabels(): string[] {
    if (this.currentCo2RestBudget > 0) {
      return ['CO₂ from Transport', 'Rest Budget'];
    }
    else {
      return ['CO₂ from Transport'];
    }
  }

  // Methods: Co2-PieChart Details
  getCo2PieChartDetailsData(): number[] {
    if (this.currentCo2RestBudget > 0) {
      this.currentCo2Data.push(this.currentCo2RestBudget);
    }
    return this.currentCo2Data;
  }

  getCo2PieChartDetailsLabels(): string[] {
    if (this.currentCo2RestBudget > 0) {
      return ['Car', 'Motorbike', 'Public Transport', 'Rest Budget'];
    }
    else {
      return ['Car', 'Motorbike', 'Public Transport'];
    }
  }

  // Methods: Co2-Alert
  getCo2AlertType(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'success';
    }
    else if (this.currentCo2RestBudget === 0){
      return 'warning';
    }
    else {
      return 'danger';
    }
  }

  getCo2AlertMessage(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'Great! Over the last 30 days you have been emitting less CO₂ from transport per day than the average citizen!';
    }
    else if (this.currentCo2RestBudget === 0) {
      return 'No improvement... Over the last 30 days you have been emitting just as much CO₂ from transport as the average citizen.';
    }
    else {
      return 'Oh no... Over the last 30 days you have been emitting MORE CO₂ from transport than the average citizen!';
    }
  }
}
