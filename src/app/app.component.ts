import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Location } from '@angular/common';
import { MapsSdkService } from './services/maps-sdk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '🚴🌳 Green Traveller';

  constructor(
    private dataService: DataService,
    private location: Location,
    private router: Router,
    private mapsSdkService: MapsSdkService) {
  }

  ngOnInit(): void {
    this.checkLandingPage();
  }

  checkMobileDevice(): boolean {
    if (screen.width < 500 ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i)) {
          return true;
        }
    return false;
  }

  checkLandingPage(): void {
    const finished = this.dataService.getSetupCompleted();
    if (!finished) {
      if (this.checkMobileDevice() !== true) {
        this.navigate('/setup/desktop');
        } else {
        this.navigate('/setup/name');
      }
    }
  }

  navigate(s: string): void {
    this.router.navigateByUrl(s);
    this.location.replaceState(s);
  }
}
