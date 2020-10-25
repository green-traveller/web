import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Colors, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartType: ChartType = 'bar';

  @Input() barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
        display: true,
        position: 'bottom'
      },
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

  @Input() barChartLabels: Label[];

  @Input() barChartPlugins = [];
  
  @Input() barChartLegend = true;

  @Input() barChartData: ChartDataSets[];
  
  @Input() barChartColors: Colors;

  constructor() { }

  ngOnInit() {
  }

}
