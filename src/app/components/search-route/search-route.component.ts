import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.css']
})
export class SearchRouteComponent implements OnInit {

  @ViewChild('nowButton') nowButton: ElementRef;
  @ViewChild('dateInput') dateInput: ElementRef;
  constructor() { }

  ngOnInit(): void {
    console.log(this.nowButton);
  }

  handleNowButtonClick(): void {
    this.dateInput.nativeElement.value = new Date().toISOString().split('T')[0];
  }
}
