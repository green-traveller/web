import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Route } from 'src/app/models/route';
import { Vehicle } from 'src/app/models/vehicle';
import { DataService } from 'src/app/services/data.service';
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

    public routeResults: Route[] = [
      {
        id: 'a',
        from: {name: 'start', place_id: '1'},
        to: {name: 'destination', place_id: '2'},
        time: '01-01-1970',
        vehicleId: 'walking',
        passengers: 1,
        options: { walking: { distance: 30, duration: 40}}
      },
      {
        id: 'b',
        from: {name: 'start', place_id: '1'},
        to: {name: 'destination', place_id: '2'},
        time: '01-01-1970',
        vehicleId: 'bicycling',
        passengers: 1,
        options: { bicycling: { distance: 30, duration: 40}}
      },
      {
        id: 'c',
        from: {name: 'start', place_id: '1'},
        to: {name: 'destination', place_id: '2'},
        time: '01-01-1970',
        vehicleId: 'transit',
        passengers: 1,
        options: { transit: { distance: 30, duration: 40}}
      },
      {
        id: 'd',
        from: {name: 'start', place_id: '1'},
        to: {name: 'destination', place_id: '2'},
        time: '01-01-1970',
        vehicleId: 'driving',
        passengers: 1,
        options: { driving: { distance: 30, duration: 40}}
      },
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
