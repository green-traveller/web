import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-balance',
  templateUrl: './personal-balance.component.html',
  styleUrls: ['./personal-balance.component.css']
})
export class PersonalBalanceComponent implements OnInit {
  public avgTranspCO2German: number = 100.0; // replace with current value for average co2-emissions per 30 days caused by transport by a German
  
  public currentCo2Data: number[] = [20, 7, 15, 10, 13];
  
  public currentCo2Sum = this.currentCo2Data.reduce((pv, cv) => pv + cv, 0); 

  public currentCo2RestBudget: number = this.avgTranspCO2German - this.currentCo2Sum;
  
  public co2PieChartData: number[]  = this.getCo2PieChartData();
  
  getCo2PieChartData(): number[] {
    this.currentCo2Data.push(this.currentCo2RestBudget);
    return this.currentCo2Data
  };

  public co2AlertMessage: string = this.getCo2AlertMessage();

  getCo2AlertMessage(): string {
    if (this.currentCo2RestBudget > 0) {
      return 'Great! Recently you have been emitting less CO₂ from transport than the average German.'
    } else if (this.currentCo2RestBudget = 0) {
      return 'No improvement... Recently you have been emitting just as much CO₂ from transport as the average German.'
    }
    else {
      return 'Oh no... In the last 30 days you have been emitting MORE CO₂ from transport than the average German!'
    }
  }

  // public co2AlertType: string = this.getCo2AlertType();

  // getCo2AlertType(): string {
  //   if (this.currentCo2RestBudget > 0) {
  //     return 'success'
  //   } else if (this.currentCo2RestBudget = 0){
  //     return 'warning'
  //   }
  //   else {
  //     return 'danger'
  //   }
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
