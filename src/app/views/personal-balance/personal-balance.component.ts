import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-balance',
  templateUrl: './personal-balance.component.html',
  styleUrls: ['./personal-balance.component.css']
})
export class PersonalBalanceComponent implements OnInit {

  avgTranspCO2German: number = 4.4; // average co2-emissions [kg] per day caused by transport (excluding air travel) by a German
  
  currentCo2Data: number[] = [0.81, 0.23, 1.26]; // average co2 emissions per day in kg over the last 30 days from different means of transport
  
  currentCo2Sum = this.currentCo2Data.reduce((pv, cv) => pv + cv, 0); 

  currentCo2RestBudget: number = this.avgTranspCO2German - this.currentCo2Sum;

  // Co2-PieChart
  
  co2PieChartData: number[]  = this.getCo2PieChartData();
  
  getCo2PieChartData(): number[] {
    if (this.currentCo2RestBudget >= 0) {
      this.currentCo2Data.push(this.currentCo2RestBudget);
      return this.currentCo2Data
    } else {
      return [this.currentCo2Sum]
    }    
  };

  co2PieChartLabels: string[] = ['Car', 'Motorbike', 'Public Transport', 'Rest Budget'];

  co2PieChartColors: object[] =  [
    {
      backgroundColor: ["#ff4233", "#ff8c00", "#e6ff33", "#f0f0f0"], //"#9fffcb", "#47c3a0", "#25a18e", 
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff'
    } 
  ];

  co2AlertMessage: string = this.getCo2AlertMessage();

  getCo2AlertMessage(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'Great! Recently you have been emitting less CO₂ from transport than the average German!'
    } else if (this.currentCo2RestBudget = 0) {
      return 'No improvement... Recently you have been emitting just as much CO₂ from transport as the average German.'
    }
    else {
      return 'Oh no... In the last 30 days you have been emitting MORE CO₂ from transport than the average German!'
    }
  }
  
  co2AlertType: string = this.getCo2AlertType();

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

  personalGoal: number = 3; // meaning 3 kg per day from transport, average German emmits around 4.4 kg a day from transport (not including air travel)

  personalGoalBarStatus: number = (this.currentCo2Sum / this.personalGoal) ;

  personalGoalAlertMessage: string = this.getPersonalGoalAlertMessage();

  getPersonalGoalAlertMessage(): string {
    if (this.personalGoalBarStatus < 1) {
      return `Great! In the last 30 days you have been true to your personal goal and kept your CO₂-emissions from transport lower than ${this.personalGoal} kg per day!`
    } else if (this.personalGoalBarStatus  = 1) {
      return `Great! You have reached your goal and emitted exactly ${this.currentCo2Sum} kg of CO₂ from transport over the last 30 days. Can you do even better?`
    }
    else {
      return `Oh no, you missed your goal! In the last 30 days you have emitted more CO₂ from transport than ${this.personalGoal} kg per day!`
    }
  }

  personalGoalAlertType: string = this.getPersonalGoalAlertType();

  getPersonalGoalAlertType(): string {
    if (this.personalGoalBarStatus < 1) {
      return 'success'
    } else if (this.personalGoalBarStatus  = 1){
      return 'warning'
    }
    else {
      return 'danger'
    }
  }


  // Distance-PieChart
  
  distancePieChartLabels: string[] = ['Car', 'Motorbike', 'Public Transport', 'Bicycle', 'By Foot'];

  distancePieChartData: number[] = [150, 70, 60, 100, 20, 200, 200, 110];

  distancePieChartColors: object[] = [
    {
      backgroundColor: ["#ff3311", "#ee7700","#ff8c00", "#ffa500", "#f3c318", "#e6ff33", "#9fffcb", "#47c3a0"], //, "#25a18e"
      borderColor: '#fff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#9ffcb',
      pointHoverBorderColor: '#52f75d'
    } 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
