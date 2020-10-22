import { Component, OnInit } from '@angular/core';
import {
  faCarSide,
  faMotorcycle,
  faBicycle,
  faWalking,
  faSubway
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-route-search-results',
  templateUrl: './route-search-results.component.html',
  styleUrls: ['./route-search-results.component.css']
})
export class RouteSearchResultsComponent implements OnInit {

  icons = {
      car: faCarSide,
      motorcycle: faMotorcycle,
      bicycle: faBicycle,
      train: faSubway,
      walking: faWalking
    };

  constructor() { }

  ngOnInit(): void {
  }

}
