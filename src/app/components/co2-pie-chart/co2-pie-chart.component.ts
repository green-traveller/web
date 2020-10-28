import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-co2-pie-chart',
  templateUrl: './co2-pie-chart.component.html',
  styleUrls: ['./co2-pie-chart.component.css']
})
export class Co2PieChartComponent implements OnInit {  

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {    
    this.dataService.getRoutesByDate();
  }

  avgTranspCO2German: number = 4.4; // average co2-emissions [kg] per day caused by transport (excluding air travel) by a German
  
  currentCo2Data: number[] = [0.81, 0.23, 1.26]; // average co2 emissions per day in kg over the last 30 days from different means of transport

  currentCo2Sum = this.currentCo2Data.reduce((pv, cv) => pv + cv, 0); 

  currentCo2RestBudget: number = this.avgTranspCO2German - this.currentCo2Sum;

  // General Co2-PieChart (All co2 summed up)
  
  co2PieChartData: number[]  = this.getCo2PieChartData();  
  
  getCo2PieChartData(): number[] { 
    if (this.currentCo2RestBudget > 0) {
      return [this.currentCo2Sum, this.currentCo2RestBudget];
    } 
    else {
      return [this.currentCo2Sum];
    }    
  };

  co2PieChartLabels: string[] = this.getCo2PieChartLabels();

  getCo2PieChartLabels(): string[] { 
    if (this.currentCo2RestBudget > 0) {
      return ['CO₂ from Transport', 'Rest Budget'];
    } 
    else {
      return ['CO₂ from Transport'];
    }    
  };

  co2PieChartColors: object[] =  [
    {
      backgroundColor: ["#ff4233", "#f0f0f0"], 
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff'
    } 
  ];

  // Co2-PieChart Details  

  co2PieChartDetailsData: number[]  = this.getCo2PieChartDetailsData();
  
  getCo2PieChartDetailsData(): number[] {
    if (this.currentCo2RestBudget > 0) {
      this.currentCo2Data.push(this.currentCo2RestBudget);
    }
    return this.currentCo2Data
  };

  co2PieChartDetailsLabels: string[] = this.getCo2PieChartDetailsLabels();

  getCo2PieChartDetailsLabels(): string[] { 
    if (this.currentCo2RestBudget > 0) {
      return ['Car', 'Motorbike', 'Public Transport', 'Rest Budget'];
    } 
    else {
      return ['Car', 'Motorbike', 'Public Transport'];
    }    
  };

  co2PieChartDetailsColors: object[] =  [
    {
      backgroundColor: ["#ff4233", "#ff8c00", "#e6ff33", "#f0f0f0"], 
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff'
    } 
  ];

  // Co2-Alert

  co2Alert: Alert = {
    type: this.getCo2AlertType(),
    message: this.getCo2AlertMessage()
  };

  getCo2AlertType(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'success'
    } 
    else if (this.currentCo2RestBudget = 0){
      return 'warning'
    }
    else {
      return 'danger'
    }
  }

  getCo2AlertMessage(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'Great! Over the last 30 days you have been emitting less CO₂ from transport per day than the average citizen!'
    } 
    else if (this.currentCo2RestBudget = 0) {
      return 'No improvement... Over the last 30 days you have been emitting just as much CO₂ from transport as the average citizen.'
    }
    else {
      return 'Oh no... Over the last 30 days you have been emitting MORE CO₂ from transport than the average citizen!'
    }
  }
  
  co2AlertClosed = false;

  showDetails = false;

}
