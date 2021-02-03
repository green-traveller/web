import { Alert } from 'src/app/models/alert';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Co2PieChartComponent } from 'src/app/components/co2-pie-chart/co2-pie-chart.component';
import { Co2BarChartComponent } from 'src/app/components/co2-bar-chart/co2-bar-chart.component';
import { DataService } from 'src/app/services/data.service';
import { formatNumber } from '@angular/common';
import { IconService } from '../../services/icon.service';
import { KmPieChartComponent } from 'src/app/components/km-pie-chart/km-pie-chart.component';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-personal-balance',
  templateUrl: './personal-balance.component.html',
  styleUrls: ['./personal-balance.component.css']
})
export class PersonalBalanceComponent implements OnInit {

  // Personal Goal
  currentCo2Sum: number = this.dataService.getTotalCo2Last30Days(this.routeService);
  personalGoal: number = this.dataService.getCo2PersonalChallenge().value;
  personalGoalBarStatus: number = (this.currentCo2Sum / this.personalGoal);
  personalGoalAlert: Alert = {
    type: this.getPersonalGoalAlertType(),
    message: this.getPersonalGoalAlertMessage()
  };
  showPersonalChallengeAlert = true;

  // Component Ids
  @ViewChild( 'carousel' ) carousel: NgbCarousel;
  @ViewChild( 'chartCanvas' ) chartCanvas: HTMLCanvasElement;
  @ViewChild( 'co2BarChart' ) co2BarChart: Co2BarChartComponent;
  @ViewChild( 'co2PieChart' ) co2PieChart: Co2PieChartComponent;
  @ViewChild( 'kmPieChart' ) kmPieChart: KmPieChartComponent;

  constructor(private dataService: DataService, private routeService: RouteService, public iconService: IconService) { }

  ngOnInit(): void {}

  // Alert Methods

  getPersonalGoalAlertType(): string {
    if (this.personalGoalBarStatus < 1) {
      return 'success';
    }
    else if (this.personalGoalBarStatus === 1) {
      return 'warning';
    }
    else {
      return 'danger';
    }
  }

  getPersonalGoalAlertMessage(): string {
    if (this.personalGoalBarStatus < 1) {
      return `Great! Over the last 30 days you have mastered your personal challenge and even kept your CO₂ emissions
      from transport ${formatNumber((1 - this.personalGoalBarStatus) * 100, 'en_US', '1.1-1')} % lower!`;
    }
    else if (this.personalGoalBarStatus  === 1) {
      return `Great! Over the last 30 days you have mastered your personal challenge and emitted exactly ${formatNumber(this.currentCo2Sum, 'en_US', '1.0-0')}
      kg of CO₂ from transport. Can you do even better?`;
    }
    else {
      return `Oh no, you failed your personal challenge! Over the last 30 days you have emitted ${formatNumber((this.personalGoalBarStatus - 1) * 100, 'en_US', '1.1-1')} % more CO₂
      from transport than you planned to!`;
    }
  }

  // getter

  getActiveCarouselId(): string {
    return this.carousel.activeId;
  }

  getCo2PieChart(): Co2PieChartComponent {
    return this.co2PieChart;
  }

  getKmPieChart(): KmPieChartComponent {
    return this.kmPieChart;
  }

  getCo2BarChart(): Co2BarChartComponent {
    return this.co2BarChart;
  }

  getCo2PieChartCanvas(): HTMLCanvasElement {
    return this.getCo2PieChart().getCo2PieChart().getPieChartCanvas();
  }

  getKmPieChartCanvas(): HTMLCanvasElement {
    return this.getKmPieChart().getKmPieChart().getPieChartCanvas();
  }

  getCo2BarChartCanvas(): HTMLCanvasElement {
    return this.getCo2BarChart().getBarChart().getBarChartCanvas();
  }
  // Canvas Methods

  setImageDataForActiveChart(chartId: string): void {
    const chart = chartId.substring(10, 11);
    switch (chart) {
      case '0':
        this.chartCanvas = this.getCo2PieChartCanvas();
        break;
      case '1':
        this.chartCanvas = this.getKmPieChartCanvas();
        break;
      case '2':
        this.chartCanvas = this.getCo2BarChartCanvas();
        break;
    }
  }

  onSocialMediaClick(): void {
    this.setImageDataForActiveChart(this.getActiveCarouselId());
  }
}
