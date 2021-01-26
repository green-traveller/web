import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './data.service';
import { IconService } from './icon.service';

import { Route } from '../models/route';
import { RouteOption } from '../models/route-option';
import { Vehicle } from '../models/vehicle';
import { formatNumber } from '@angular/common';

const BASE_MAPS_URL = 'https://www.google.com/maps/dir/?api=1';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private dataService: DataService, private iconService: IconService) {}

  static getLocationFirstPart(s: string): string {
    return s.split(',')[0];
  }

  static getLocationRest(s: string): string {
    let array = s.split(', ');
    if (array.length > 1) {
      array = array.splice(1, array.length);
    } else {
      array = [' '];
    }
    return array.join(', ');
  }

  getMapsLink(route: Route): string {
    const origin = route.from.name;
    const destination = route.to.name;
    const originPlaceId = route.from.place_id;
    const destinationPlaceId = route.to.place_id;
    const travelmode = this.getVehicle(route).travelmode;
    return encodeURI(`${BASE_MAPS_URL}&origin=${origin}&destination=${destination}&origin_place_id=${originPlaceId}&destination_place_id=${destinationPlaceId}&travelmode=${travelmode}`);
  }

  /**
   * returns duration in seconds.
   */
  getDuration(route: Route): number {
    return this.getActiveRouteOption(route).duration;
  }

  /**
   * returns duration as string, formatted as HH:mm
   */
  getDurationString(route: Route): string {
    const totalMinutes = Math.round(this.getDuration(route) / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hoursString = hours < 10 ? '0' + hours : '' + hours;
    const minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
    return `${hoursString}:${minutesString}`;
  }

  /**
   * returns distance in meters.
   */
  getDistance(route: Route): number {
    return this.getActiveRouteOption(route).distance;
  }

  /**
   * return distance in km as string with two decimal digits.
   */
  getDistanceString(route: Route): string {
    return formatNumber(this.getDistance(route) / 1000, 'en_US', '1.2-2');
  }

  getActiveRouteOption(route: Route): RouteOption {
    return route.options[this.getVehicle(route).travelmode];
  }

  /**
   * returns co2 amount (*grams*) for route, taking passengers into consideration.
   */
  getCo2Grams(route: Route): number {
    let value = (this.getDistance(route) / 1000) * this.getVehicle(route).co2;
    if (this.getVehicle(route).travelmode !== 'transit' && route.passengers !== 0) {
      value /= route.passengers;
    }
    return value;
  }

  /**
   * returns co2 amount (*kilograms*) for route, taking passengers into consideration.
   */
  getCo2Kilograms(route: Route): number {
    return this.getCo2Grams(route) / 1000;
  }

  getCo2KgPerKm(route): number {
    return this.getCo2Grams(route) / this.getDistance(route);
  }

  getCo2KgPerHour(route):number {
    return this.getCo2Kilograms(route) / (this.getDuration(route) / 3600);
  }

  getMainTo(route: Route): string {
    return RouteService.getLocationFirstPart(route.to.name);
  }

  getMainFrom(route: Route): string {
    return RouteService.getLocationFirstPart(route.from.name);
  }

  getSecondaryTo(route: Route): string {
    return RouteService.getLocationRest(route.to.name);
  }

  getSecondaryFrom(route: Route): string {
    return RouteService.getLocationRest(route.from.name);
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

  getPossibleVehicles(route: Route): Vehicle[] {
    const activeVehicles = this.dataService.getActiveVehicles();
    const validTravelmodes = Object.keys(route.options);
    return activeVehicles.filter(v => validTravelmodes.includes(v.travelmode));
  }

  isFavRoute(route: Route): Boolean {
    const favRoutes = this.dataService.getFavRoutes();

    if(favRoutes) {
      const checkId = route.from.place_id + route.to.place_id;
      return favRoutes[checkId] !== undefined;
    } else {
      return false;
    }
  }

  toggleFavState(route: Route): void {
    if (this.isFavRoute(route)) {
      this.dataService.deleteFavRoute(route);
    } else {
      this.dataService.setFavRoute(route);
    }
  }
}
