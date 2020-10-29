import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Co2 } from '../../../models/co2';

@Component({
  selector: 'app-customisation',
  templateUrl: './customisation.component.html',
  styleUrls: ['./customisation.component.css']
})
export class CustomisationComponent implements OnInit {

  @ViewChild('customInput') customInput: ElementRef;

  // https://www.worldometers.info/co2-emissions/germany-co2-emissions/
  defaultValues = {
    average: 148, // (per capita * 0.189) / 12
    lower: 100
  };

  username: string;
  co2: Co2;

  customAmount: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.co2 = this.dataService.getCo2PersonalGoal();
    this.customAmount = this.co2.value;
    this.username = this.dataService.getUsername();
  }

  handleRadioChange(): void {
    if (this.co2.mode !== 'custom') {
      this.customAmount = this.defaultValues[this.co2.mode];
      this.co2.value = this.defaultValues[this.co2.mode];
    }
    this.dataService.setStorage();
  }

  handleCustomAmountChange(): void {
    if (!this.customInput.nativeElement.validity.valid || this.customAmount === null) {
      this.customAmount = 148;
    }
    this.co2.value = this.customAmount;
    this.dataService.setStorage();
  }

  focusOnCustomInput(): void {
    this.customInput.nativeElement.focus();
  }

  handleUsernameChange(): void {
    if (this.username === '') {
      this.username = 'User';
    }
    this.dataService.setUsername(this.username);
  }
}
