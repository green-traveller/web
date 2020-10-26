import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { MapsSdkService } from './services/maps-sdk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '🚴🌳 Green Traveller';

  constructor(private dataService: DataService, private mapsSdkService: MapsSdkService) {
  }

  ngOnInit(): void { }
}
