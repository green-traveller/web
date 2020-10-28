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
    aspectRatio: 1.25,
    responsive: true,
    legend: {
        display: true,
        position: 'bottom'
      },
    scales: { xAxes:
                [{ticks:
                  {
                    display: true,
                  },
                  scaleLabel: {
                    display: false,
                    labelString: 'Last 6 Months'
                  }
                }],
              yAxes:
                [{
                  ticks: {
                    display: true,
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: false,
                    labelString: 'avg kg / day'
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

  ngOnInit(): void {
  }

}
