import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { Route } from '../models/route';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private route: Route;

  constructor(private dataService: DataService, private routeService: RouteService) { }

  setRoute(route: Route): void {
    // TODO remove once result view is merged
    const activeVehicles = this.routeService.getPossibleVehicles(route);
    const randomNumber = Math.floor(activeVehicles.length * Math.random());
    route.vehicleId = activeVehicles[randomNumber].id;
    this.dataService.setRoute(route);
    console.log(route);
    console.log(this.routeService.getMapsLink(route));
    console.log('co2:', this.routeService.getCo2Kilograms(route));
    console.log('duration:', this.routeService.getDurationString(route));
    console.log('distance:', this.routeService.getDistanceString(route));
    // remove end
    this.route = route;
  }

  getRoute(): Route {
    return this.route;
  }
}
