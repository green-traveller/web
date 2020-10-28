import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  pieChartType: ChartType = 'pie';

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },

    tooltips: {
      enabled: true,
      bodyFontSize: 20,
      xPadding: 10,
      yPadding: 10,
      backgroundColor: 'rgba(38, 194, 129, 0.8)',
      bodyFontColor: '#000',
      callbacks: {
       label(tooltipItem, data): string[] {
        const label = data.labels[tooltipItem.index];
        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].valueOf().toString();

        return [` ${label} ${formatNumber(Number(value), 'en_US', '1.2-2')} kg`];
       },
      },
     },

    plugins: {
     datalabels: {
      formatter: (value, ctx) => {
       const label = '0.00';
       return label;
      },
     },
    },
    maintainAspectRatio: false
   };

  @Input() pieChartLabels: string[];

  @Input() pieChartData: number[];

  @Input() pieChartColors: Array<any>;

  @Input() pieChartLegend: boolean;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
