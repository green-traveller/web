import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './data.service';
import { IconService } from './icon.service';

import { Route } from '../models/route';
import { RouteOption } from '../models/route-option';
import { Vehicle } from '../models/vehicle';

const baseUrl = 'https://www.google.com/maps/dir/?api=1';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private dataService: DataService, private iconService: IconService) {}

  getMapsLink(route: Route): string {
    const origin = route.from.name;
    const destination = route.to.name;
    const originPlaceId = route.from.place_id;
    const destinationPlaceId = route.to.place_id;
    const travelmode = this.getVehicle(route).travelmode;
    return encodeURI(`${baseUrl}&origin=${origin}&destination=${destination}&origin_place_id=${originPlaceId}&destination_place_id=${destinationPlaceId}&travelmode=${travelmode}`);
  }

  getDuration(route: Route): number {
    return this.getActiveRouteOption(route).duration;
  }

  getDistance(route: Route): number {
    return this.getActiveRouteOption(route).distance;
  }

  getActiveRouteOption(route: Route): RouteOption {
    return route.options[this.getVehicle(route).travelmode];
  }

  getCo2Grams(route: Route): number {
    let value = this.getDistance(route) * this.getVehicle(route).co2;
    if (this.getVehicle(route).travelmode !== 'transit' && route.passengers !== 0) {
      value /= route.passengers;
    }
    return value;
  }

  getCo2Kilograms(route: Route): number {
    return this.getCo2Grams(route) / 1000;
  }

  getVehicle(route: Route): Vehicle {
    return this.dataService.getVehicle(route.vehicleId);
  }

  getVehicleIcon(route: Route): IconDefinition {
    return this.iconService.getIcon(this.getVehicleIconString(route));
  }

  getVehicleIconString(route: Route): string {
    return this.getVehicle(route).type;
  }
}
