import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.css']
})
export class SearchRouteComponent implements OnInit {

  @ViewChild('nowButton') nowButton: ElementRef;
  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('timeInput') timeInput: ElementRef;

  departureArrival = 'Departure';

  constructor() { }

  ngOnInit(): void {
    console.log(this.nowButton);
  }

  setCurrentDateTime(): void {
    this.timeInput.nativeElement.value = formatDate(new Date(), 'HH:mm', 'en-US');
    this.dateInput.nativeElement.value = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.setCurrentDateTime();
  }

  handleNowButtonClick(): void {
    this.setCurrentDateTime();
  }
}
