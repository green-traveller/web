import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  model = 'average';
  customAmount = this.defaultValues.average;

  currentAmount = this.defaultValues.average;

  constructor() { }

  ngOnInit(): void {
  }

  handleRadioChange(): void {
    if (this.model !== 'custom') {
      this.customAmount = this.defaultValues[this.model];
      this.currentAmount = this.defaultValues[this.model];
    }
  }

  handleCustomAmountChange(): void {
    // TODO
  }
}
