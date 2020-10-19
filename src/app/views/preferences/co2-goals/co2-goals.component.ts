import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Co2 } from '../../../models/co2';

@Component({
  selector: 'app-co2-goals',
  templateUrl: './co2-goals.component.html',
  styleUrls: ['./co2-goals.component.css']
})
export class Co2GoalsComponent implements OnInit {

  // https://www.worldometers.info/co2-emissions/germany-co2-emissions/
  defaultValues = {
    average: 148, // (per capita * 0.189) / 12
    lower: 100
  };

  co2: Co2;

  customAmount: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.co2 = this.dataService.getCo2();
    this.customAmount = this.co2.value;
  }

  handleRadioChange(): void {
    if (this.co2.mode !== 'custom') {
      this.customAmount = this.defaultValues[this.co2.mode];
      this.co2.value = this.defaultValues[this.co2.mode];
    }
    this.dataService.setStorage();
  }

  handleCustomAmountChange(): void {
    this.co2.value = this.customAmount;
    this.dataService.setStorage();
  }
}
