import { formatNumber } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js';
import { Co2PieChartComponent } from 'src/app/components/co2-pie-chart/co2-pie-chart.component';
import { Alert } from 'src/app/models/alert';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-personal-balance',
  templateUrl: './personal-balance.component.html',
  styleUrls: ['./personal-balance.component.css']
})
export class PersonalBalanceComponent implements OnInit {

  currentCo2Sum = this.dataService.getTotalCo2Last30Days(this.routeService);

  @ViewChild( 'carousel' ) carousel: NgbCarousel;
  @ViewChild( 'co2PieChart' ) co2PieChart: Co2PieChartComponent;
  @ViewChild( 'co2PieChartCanvas' ) co2PieChartCanvas: HTMLCanvasElement;
  // Personal Goal

  personalGoal: number = this.dataService.getCo2PersonalChallenge().value;

  personalGoalBarStatus: number = (this.currentCo2Sum / this.personalGoal);

  personalGoalAlert: Alert = {
    type: this.getPersonalGoalAlertType(),
    message: this.getPersonalGoalAlertMessage()
  };

  showPersonalChallengeAlert = true;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  ngOnInit(): void {
  }

  getActiveCarouselId(): string {
    return this.carousel.activeId;
  }

  setImageDataForActiveChart(chartId: string): void {
    const chart = chartId.substring(10, 11);
    if (chart === '0') {
      this.co2PieChartCanvas = this.getCo2PieChartCanvas();
      //console.log(this.co2PieChartCanvas);
    }
  }

  getCo2PieChart(): Co2PieChartComponent {
    return this.co2PieChart;
  }

  getCo2PieChartCanvas(): HTMLCanvasElement {
    return this.getCo2PieChart().getPieChart().getPieChartCanvas();
  }

  getPersonalGoalAlertType(): string {
    if (this.personalGoalBarStatus < 1) {
      return 'success';
    } else if (this.personalGoalBarStatus === 1) {
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

  onSocialMediaClick(): void {
    this.setImageDataForActiveChart(this.getActiveCarouselId());
  }

  /*triggerImageExport(trigger: boolean): void {
    // (imageExportRequested)="triggerImageExport($event)" in html
    if (trigger) {
      this.setImageDataForActiveChart(this.getActiveCarouselId());
    }
  }*/
}
