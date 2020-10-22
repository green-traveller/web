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

  timeMode = 'now';

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
}
