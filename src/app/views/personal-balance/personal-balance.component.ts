import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-personal-balance',
  templateUrl: './personal-balance.component.html',
  styleUrls: ['./personal-balance.component.css']
})
export class PersonalBalanceComponent implements OnInit {  
  
  currentCo2Sum = this.dataService.getTotalCo2Last30Days(this.routeService); 

  // Personal Goal  

  personalGoal: number = this.dataService.getCo2().value;

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

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
  }

}
