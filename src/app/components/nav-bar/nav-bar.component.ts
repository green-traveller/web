import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  iconS: IconService;

  hideBackButton = false;

  constructor(private location: Location, private router: Router, private iconService: IconService) { }

  @Input() title = 'default title';

  ngOnInit(): void {
    this.iconS = this.iconService;
    if (this.location.path() === '') {
      this.hideBackButton = true;
    }
  }

  back(): void {
    if (!this.hideBackButton) {
      this.location.back();
    }
  }

  navigate(s: string): void {
    if (s === '/') {
      this.router.navigateByUrl(s);
      this.location.replaceState(s);
    } else {
      this.router.navigateByUrl(s);
    }
  }
}
