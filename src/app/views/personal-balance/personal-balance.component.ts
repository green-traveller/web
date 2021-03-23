import { Alert } from 'src/app/models/alert';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Co2PieChartComponent } from 'src/app/components/co2-pie-chart/co2-pie-chart.component';
import { Co2BarChartComponent } from 'src/app/components/co2-bar-chart/co2-bar-chart.component';
import { DataService } from 'src/app/services/data.service';
import { formatNumber } from '@angular/common';
import { IconService } from '../../services/icon.service';
import { KmPieChartComponent } from 'src/app/components/km-pie-chart/km-pie-chart.component';
import { NgbCarousel, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { RouteService } from 'src/app/services/route.service';
import { Color } from 'ng2-charts';

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
  @ViewChild( 'co2BarChart' ) co2BarChart: Co2BarChartComponent;
  @ViewChild( 'co2PieChart' ) co2PieChart: Co2PieChartComponent;
  @ViewChild( 'kmPieChart' ) kmPieChart: KmPieChartComponent;

  chartCanvas: HTMLCanvasElement;

  // attributes for Progressbar drawing
  colorGreen = '#85bb88';
  colorRed = '#ff6961';
  canvasHeight = 50;
  canvasWidth = undefined;
  startPoint = undefined;
  rightPoint = undefined;
  leftPoint = 10;
  topPoint = 10;
  bottomPoint = undefined;
  switchColor = false;
  startColor: any;

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

  getCo2BarChart(): Co2BarChartComponent {
    return this.co2BarChart;
  }

  getCo2BarChartCanvas(): HTMLCanvasElement {
    return this.getCo2BarChart().getBarChart().getBarChartCanvas();
  }

  getCo2PieChart(): Co2PieChartComponent {
    return this.co2PieChart;
  }

  getCo2PieChartCanvas(): HTMLCanvasElement {
    return this.getCo2PieChart().getCo2PieChart().getPieChartCanvas();
  }

  getKmPieChart(): KmPieChartComponent {
    return this.kmPieChart;
  }

  getKmPieChartCanvas(): HTMLCanvasElement {
    return this.getKmPieChart().getKmPieChart().getPieChartCanvas();
  }

  // Canvas Methods

  drawCanvas(width: number): HTMLCanvasElement {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 50;

    this.calculateProgressBarValues(canvas.width, canvas.height);

    canvas = this.drawProgressBarNew();

    return canvas;
  }

  calculateProgressBarValues(width: number, height: number): void {
    this.rightPoint = width - 10;
    this.bottomPoint = height - 10;

    this.startPoint = width * this.personalGoalBarStatus;

    if ((this.startPoint > 15) && (this.startPoint < (this.rightPoint - 15))) {
      this.switchColor = true;
      this.startColor = this.colorRed;
    }
    if (this.startPoint < 15) {
      this.startPoint = 15;
      this.startColor = this.colorGreen;
    }
    if (this.startPoint > (this.rightPoint - 15)) {
      this.startPoint = this.rightPoint - 15;
      this.startColor = this.colorRed;
    }
  }

  drawProgressBarNew(): HTMLCanvasElement {
    const cornerRadius = 3;
    const canvas = document.createElement('canvas');
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    const context = canvas.getContext('2d');

    context.strokeStyle = this.startColor;
    context.fillStyle = this.startColor;
    context.beginPath();
    context.moveTo(this.startPoint, this.topPoint);
    context.arcTo(this.leftPoint, this.topPoint, this.leftPoint, this.bottomPoint, cornerRadius);
    context.arcTo(this.leftPoint, this.bottomPoint, this.rightPoint, this.bottomPoint, cornerRadius);
    context.lineTo(this.startPoint, this.bottomPoint);
    context.closePath();
    context.stroke();
    context.fill();
    if ((this.switchColor) && (this.startColor === this.colorGreen)) {
      context.strokeStyle = this.colorRed;
      context.fillStyle = this.colorRed;
    } else {
      context.strokeStyle = this.colorGreen;
      context.fillStyle = this.colorGreen;
    }
    context.beginPath();
    context.moveTo(this.startPoint, this.topPoint);
    context.arcTo(this.rightPoint, this.topPoint, this.rightPoint, this.bottomPoint, cornerRadius);
    context.arcTo(this.rightPoint, this.bottomPoint, this.leftPoint, this.bottomPoint, cornerRadius);
    context.lineTo(this.startPoint, this.bottomPoint);
    context.closePath();
    context.stroke();
    context.fill();

    return canvas;
  }

  setImageDataForActiveChart(chartId: string): HTMLCanvasElement {
    const chart = chartId.substring(10, 11);
    let chartText: string;

    switch (chart) {
      case '0':
        this.chartCanvas = this.getCo2PieChartCanvas();
        chartText = 'My CO₂ Emissions';
        break;
      case '1':
        this.chartCanvas = this.getKmPieChartCanvas();
        chartText = 'My Means of Transport';
        break;
      case '2':
        this.chartCanvas = this.getCo2BarChartCanvas();
        chartText = 'My Emissions Over the Last 6 Months';
        break;
    }

    // create Canvas for drawing
    const exportCanvas = document.createElement('canvas');
    const context = exportCanvas.getContext('2d');

    // set size of Canvas for titles, progressbar and chart
    this.canvasWidth = this.chartCanvas.width;
    exportCanvas.width = this.canvasWidth;
    exportCanvas.height = this.chartCanvas.height + (this.chartCanvas.height * 0.5);

    // positioning of titles and progressbar
    const heightUpperParts = (this.chartCanvas.height * 0.5) / 5;
    const positionGT = heightUpperParts;
    const positionPC = heightUpperParts * 2 + heightUpperParts / 2;
    const positionCO2 = positionPC + heightUpperParts * 2;
    const positionPB = positionPC + heightUpperParts / 2;

    // fill background
    context.beginPath();
    context.rect(0, 0, exportCanvas.width, exportCanvas.height);
    context.fillStyle = '#204B57';
    context.fill();

    // draw progressbar and chart on exportCanvas
    context.drawImage(this.drawCanvas(exportCanvas.width), 0, positionPB);
    context.drawImage(this.chartCanvas, 0, exportCanvas.height - this.chartCanvas.height);

    // add titles to exportCanvas
    context.textAlign = 'center';
    context.font = 'bold 60px sans-serif';
    context.fillStyle = '#26C281';

    let text = '\uD83D\uDEB4 \uD83C\uDF33 Green Traveller';
    context.fillText(text, exportCanvas.width / 2, positionGT);

    context.font = 'bold 40px sans-serif';
    text = 'My Personal Challenge';
    context.fillText(text, exportCanvas.width / 2, positionPC);
    context.fillText(chartText, exportCanvas.width / 2, positionCO2);

    return exportCanvas;
  }

  // social media button functionality

  onSocialMediaClick(): void {
    const id = this.getActiveCarouselId();
    const canvas = this.setImageDataForActiveChart(id);
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    const file = new File([this.b64toBlob(img.src.substring(22))],
      'image.png',
      { type: 'image/png' }
      );
    // @ts-ignore
    if (navigator.canShare) {
      navigator.share({
      // @ts-ignore
      files: [file],
      title: '',
      url: ''
      });
    } else {
    this.export(img.src);
    }
  }

  // image data conversion for export

  b64toBlob(b64Data: string): Blob {
    const contentType = '';
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  export(imageSource: any): void {
    const dataStr = imageSource;
    const exportElement = document.createElement('a');
    exportElement.setAttribute('href', dataStr);
    const exportName = 'image.png';
    exportElement.setAttribute('download', exportName);
    exportElement.click();
    exportElement.remove();
  }
}
