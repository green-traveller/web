import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

//import { PersonalBalanceComponent } from 'src/app/views/personal-balance/personal-balance.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public avgTranspCO2German: number = 100.0; // replace with current value for average co2-emissions per 30 days caused by transport by a German
  
  public currentCo2Data: number[] = [20, 7, 15, 10, 13];
  
  public currentCo2Sum = this.currentCo2Data.reduce((pv, cv) => pv + cv, 0);  

  public co2PieChartData: number[]  = this.getCo2PieChartData();
  
  getCo2PieChartData(): number[] {
    this.currentCo2Data.push(this.avgTranspCO2German - this.currentCo2Sum);
    return this.currentCo2Data
  };

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Car', 'Motorbike', 'Bus', 'Tram', 'Train', 'Rest Budget'];
  //public pieChartData: number[] = [40, 10, 25 , 5, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartColors =  [
    {
      backgroundColor: ["#7ae582", "#25a18e", "#9fffcb", "#00a5cf", "#004e64", "#F0F0F0"],
      borderColor: '#fff', //["#7ae582", "#25a18e", "#9fffcb", "#00a5cf", "#004e64"],
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#9ffcb',
      pointHoverBorderColor: '#52f75d'
    } 
  ];
  
  public pieChartLegend:boolean; // = true;

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
