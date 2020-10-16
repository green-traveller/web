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
  constructor() { }

  ngOnInit(): void {
    console.log(this.nowButton);
  }

  ngAfterViewInit(): void {
    let dateStrings: String[] = new Date().toISOString().split('T');
    this.dateInput.nativeElement.value = dateStrings[0];
    this.timeInput.nativeElement.value = dateStrings[1].substring(0,5);
  }

  handleNowButtonClick(): void {
    this.dateInput.nativeElement.value = new Date().toISOString().split('T')[0];
  }
}
