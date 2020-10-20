import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: 
                [{ticks: 
                  {
                    display:true,
                  }
                }], 
              yAxes: 
                [{ticks: 
                  {
                    display:true,
                    beginAtZero:true,
                  }
                }] 
              },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['May', 'June', 'July', 'August', 'September', 'October'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [2.5, 2.25, 1.9, 2.7, 2.55, 2.1], label: 'CO₂ (kg/day)' },
  ];
  
  barChartColors = [] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
