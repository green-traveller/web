import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';

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

  // Personal Goal  

  personalGoal: number = 3; // meaning 3 kg per day from transport, average German emmits around 4.4 kg a day from transport (not including air travel)

  personalGoalBarStatus: number = (this.currentCo2Sum / this.personalGoal) ;

  personalGoalAlert: Alert = {
    type: this.getPersonalGoalAlertType(),
    message: this.getPersonalGoalAlertMessage()
  };

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

  getPersonalGoalAlertMessage(): string {
    if (this.personalGoalBarStatus < 1) {
      return `Great! In the last 30 days you have been true to your personal goal 
      and kept your CO₂-emissions from transport lower than ${this.personalGoal} kg per day!`
    } else if (this.personalGoalBarStatus  = 1) {
      return `Great! You have reached your goal and emitted exactly ${this.currentCo2Sum} 
      kg of CO₂ from transport over the last 30 days. Can you do even better?`
    }
    else {
      return `Oh no, you missed your goal! In the last 30 days you have emitted more CO₂ 
      from transport than ${this.personalGoal} kg per day!`
    }
  }

  personalGoalAlertClosed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
