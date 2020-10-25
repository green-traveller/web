import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-co2-pie-chart',
  templateUrl: './co2-pie-chart.component.html',
  styleUrls: ['./co2-pie-chart.component.css']
})
export class Co2PieChartComponent implements OnInit {

  avgTranspCO2German: number = 4.4; // average co2-emissions [kg] per day caused by transport (excluding air travel) by a German
  
  currentCo2Data: number[] = [0.81, 0.23, 1.26]; // average co2 emissions per day in kg over the last 30 days from different means of transport
  
  currentCo2Sum = this.currentCo2Data.reduce((pv, cv) => pv + cv, 0); 

  currentCo2RestBudget: number = this.avgTranspCO2German - this.currentCo2Sum;

  // General Co2-PieChart (All co2 summed up)
  
  co2PieChartData: number[]  = this.getCo2PieChartData();
  
  getCo2PieChartData(): number[] { 
    return [this.currentCo2Sum, this.currentCo2RestBudget];
  };

  co2PieChartLabels: string[] = ['CO₂ from Transport', 'Rest Budget'];

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
    this.currentCo2Data.push(this.currentCo2RestBudget);
    return this.currentCo2Data
  };

  co2PieChartDetailsLabels: string[] = ['Car', 'Motorbike', 'Public Transport', 'Rest Budget'];

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
    } else if (this.currentCo2RestBudget = 0){
      return 'warning'
    }
    else {
      return 'danger'
    }
  }

  getCo2AlertMessage(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'Great! Over the last 30 days you have been emitting less CO₂ from transport per day than the average citizen!'
    } else if (this.currentCo2RestBudget = 0) {
      return 'No improvement... Over the last 30 days you have been emitting just as much CO₂ from transport as the average citizen.'
    }
    else {
      return 'Oh no... Over the last 30 days you have been emitting MORE CO₂ from transport than the average citizen!'
    }
  }
  
  co2AlertClosed = false;

  showDetails = false;

  constructor() { }

  ngOnInit(): void {
  }

}
