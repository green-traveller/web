import { Component, Input, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  icons = {
    leftArrow: faChevronLeft
  };

  constructor() { }

  @Input() title = 'default title';

  ngOnInit(): void {
  }

}
