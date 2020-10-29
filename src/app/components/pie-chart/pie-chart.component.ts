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
      backgroundColor: 'rgba(32, 75, 87, 0.8)',
      bodyFontColor: '#fff',
      callbacks: {
       label(tooltipItem, data): string[] {
        const label = data.labels[tooltipItem.index];
        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].valueOf().toString();

        return [` ${label}: ${formatNumber(Number(value), 'en_US', '1.2-2')} kg`];
       },
      },
     },

    plugins: {},
    maintainAspectRatio: false
   };

  @Input() pieChartLabels: string[];

  @Input() pieChartData: number[];

  @Input() pieChartColors: Array<any>;

  @Input() pieChartLegend: boolean;  

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked(e: any): void {}

}
