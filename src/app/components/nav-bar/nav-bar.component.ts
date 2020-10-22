import { Component, Input, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  icons = {
    leftArrow: faChevronLeft
  };

  hideBackButton = false;

  constructor(private location: Location, private router: Router) { }

  @Input() title = 'default title';

  ngOnInit(): void {
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
