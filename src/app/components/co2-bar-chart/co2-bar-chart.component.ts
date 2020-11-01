import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-co2-bar-chart',
  templateUrl: './co2-bar-chart.component.html',
  styleUrls: ['./co2-bar-chart.component.css']
})
export class Co2BarChartComponent implements OnInit {
  
  co2BarChartLabels: string[] = this.getCo2BarChartLabels();

  co2BarChartData: ChartDataSets[] = [
    { data: this.dataService.getAvgCo2PerDayLast6MonthsArr(this.routeService), label: 'CO₂ (avg kg/day)' },
  ];
  
  co2BarChartColors = [
    { 
      backgroundColor: '#ff4233d8',
    },
  ];
  
  showDetails = false;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
    
  }

  getCo2BarChartLabels(): string[] {
    const labels = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date;
    let index: number = (today.getMonth() - 5);
    while (index < 0) {
      index += 12;
      }     
    for (let i=1; i<=6; i++) {
      labels.push(monthNames[index])
      index = index + 1;
      while (index > 11) {
        index -= 12;
        }   
    }    
    return labels
  }

}
