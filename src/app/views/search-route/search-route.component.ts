import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.css']
})
export class SearchRouteComponent implements OnInit {

  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('timeInput') timeInput: ElementRef;
  @ViewChild('passengerInput') passengerInput: ElementRef;

  timeMode = 'now';
  passengerAmount = 1;

  constructor() { }

  ngOnInit(): void { }

  currentTimeString(): string {
    return formatDate(new Date(), 'HH:mm', 'en-US');
  }

  currentDateString(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  handleTimeChange(): void {
    if (this.timeInput.nativeElement.value === '') {
      this.timeInput.nativeElement.value = this.currentTimeString();
    }
  }

  handleDateChange(): void {
    if (this.dateInput.nativeElement.value === '') {
      this.dateInput.nativeElement.value = this.currentDateString();
    }
  }

  handlePassengerAmountChange(): void {
    if (!this.passengerInput.nativeElement.validity.valid || this.passengerAmount < 1) {
      this.passengerAmount = 1;
    }
  }

  changePassengerAmount(n: number): void {
    this.passengerAmount += n;
    this.handlePassengerAmountChange();
  }
}
