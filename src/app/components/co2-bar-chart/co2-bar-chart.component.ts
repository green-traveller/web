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
  
  co2BarChartLabels: string[] = ['May', 'June', 'July', 'August', 'September', 'October'];

  co2BarChartData: ChartDataSets[] = [
    { data: this.dataService.getAvgCo2PerDayLast6MonthsArr(this.routeService), label: 'CO₂ (avg kg/day)' },
  ];
  
  co2BarChartColors = [
    { backgroundColor: '#ff3311' },
    { backgroundColor: 'green' },
  ];
  
  showDetails = false;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
  }

}
