import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { formatNumber } from '@angular/common';

import { Storage } from '../models/storage';
import { Co2 } from '../models/co2';
import { Vehicle } from '../models/vehicle';
import { Route } from '../models/route';
import { RouteService } from 'src/app/services/route.service';
import { FavRoute } from '../models/route-fav';

const STORAGE_KEY = 'GREEN_TRAVELLER_DATA';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getStorage();
  }

  private routeService: RouteService;

  data: Storage;

  static defaultStorage(): Storage {
    return JSON.parse(JSON.stringify({
      version: 0,
      username: 'User',
      setupCompleted: false,
      co2: {
        mode: 'average',
        value: 132
      },
      vehicles: {
        walking: {
          id: 'walking',
          name: 'Walking',
          type: 'walking',
          co2: 0,
          active: true,
          default: true,
          init: false,
          travelmode: 'walking'
        },
        bicycling: {
          id: 'bicycling',
          name: 'Bicycle',
          type: 'bicycle',
          co2: 0,
          active: true,
          default: true,
          init: true,
          travelmode: 'bicycling'
        },
        transit: {
          id: 'transit',
          name: 'Public Transportation',
          type: 'train',
          co2: 65, // https://www.co2nnect.org/help_sheets/?op_id=602&opt_id=98
          active: true,
          default: true,
          init: false,
          travelmode: 'transit'
        },
        motorcycle: {
          id: 'motorcycle',
          name: 'Average Motorcycle',
          type: 'motorcycle',
          co2: 95,
          active: true,
          default: true,
          init: true,
          travelmode: 'driving'
        },
        driving: {
          id: 'driving',
          name: 'Average Car',
          type: 'car',
          co2: 175,
          active: true,
          default: true,
          init: true,
          travelmode: 'driving'
        }
      },
      routes: { },
      favRoutes: { }
    }));
  }

  static uuidv4(): string {
    return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
      // tslint:disable-next-line:no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  // Routes

  public getRoutes(): Route[] {
    return Object.values(this.data.routes);
  }

  public getRoutesByDate(): { [date: string]: Route[] } {
    const routes = this.getRoutes().reverse();
    const result = {};
    for (const route of routes) {
      const date = route.time.split(' ')[0];
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(route);
    }
    return result;
  }

  public getRoutesDates(): string[] {
    const routes = this.getRoutes().reverse();
    const result = {};
    for (const route of routes) {
      const date = route.time.split(' ')[0];
      if (!result[date]) {
        result[date] = undefined;
      }
    }
    return Object.keys(result).sort().reverse();
  }

  public getRoutesLast30Days(): Route[] {
    const routesLast30Days = [];
    const routes = this.getRoutes();
    // To do: use object instead of array
    const last30DaysStrings = this.getLast30DaysStrings();
    for (const date of last30DaysStrings) {
      for (const route of routes) {
        const routeDate = route.time.split(' ')[0];
        if (date === routeDate) {
          routesLast30Days.push(route);
        }
      }
    }
    return routesLast30Days;
  }
  public getRoutesLast6MonthsInclCurrent(): Route[] {
    const routesLast6Months = [];
    const routes = this.getRoutes();
    // To do: use object instead of array
    const last6MonthsStrings = this.getLastXMonthsStrings(6);
    for (const month of last6MonthsStrings) {
      for (const route of routes) {
        const routeMonth = route.time.substring(0,7);
        if (month === routeMonth) {
          routesLast6Months.push(route);
        }
      }
    }
    return routesLast6Months;
  }

  public getDateString(date: Date): string {
    const dateStr = date.getFullYear() + '-' + formatNumber((date.getMonth() + 1), 'en_US', '2.0-0') + '-' + formatNumber(date.getDate(), 'en_US', '2.0-0');
    return dateStr;
  }

  public getMonthString(date: Date): string {
    const monthStr = date.getFullYear() + '-' + formatNumber((date.getMonth() + 1), 'en_US', '2.0-0');
    return monthStr;
  }

  public getLast30DaysStrings(): string[] {
    const today = Date.now();
    const days = 24 * 3600 * 1000;
    const last30DaysStrings = [];
    for (let i=0; i<30; i++) {
      const date = new Date(today - (i*days));
      const dateStr = this.getDateString(date);
      last30DaysStrings.push(dateStr);
    }
    last30DaysStrings.reverse();
    return last30DaysStrings;
  }

  public getLastXMonthsStrings(x: number): string[] {
    const today = new Date();
    const thisYear: number = today.getFullYear();
    const thisMonth: number = today.getMonth() + 1;
    const lastXMonthsStrings = [];
    for (let i = 0; i < x; i++) {
      let month: number = thisMonth - i;
      let year: number = thisYear;
      while (month <= 0) {
        month += 12;
        year--;
        }
      const monthStr = year.toString() + '-' + formatNumber(month, 'en_US', '2.0-0');
      lastXMonthsStrings.push(monthStr);
    }
    lastXMonthsStrings.reverse();
    return lastXMonthsStrings;
  }

  public getTotalCo2Last30Days(routeService: RouteService): number {
    let totalCo2Last30Days = 0;
    const routesLast30Days = this.getRoutesLast30Days();
    for (const route of routesLast30Days) {
      const co2Route = routeService.getCo2Kilograms(route);
      totalCo2Last30Days += co2Route;
      }
    return totalCo2Last30Days;
  }

  public getCo2Last30DaysByVehicle(routeService: RouteService, vehicleType: string): number {
    let co2Last30DaysByVehicle = 0;
    const routesLast30Days = this.getRoutesLast30Days();
    for (const route of routesLast30Days) {
      const routeVehicleType = routeService.getVehicle(route).type;
      if (routeVehicleType === vehicleType) {
        const co2Route = routeService.getCo2Kilograms(route);
        co2Last30DaysByVehicle += co2Route;
      }
    }
    return co2Last30DaysByVehicle;
  }

  public getAvgCo2PerDayLast6MonthsArr(routeService: RouteService): number[] {
    const avgCo2PerDayLast6MonthsArray = [];
    const routesLast6Months = this.getRoutesLast6MonthsInclCurrent();
    const last6MonthsStrings = this.getLastXMonthsStrings(6);
    for (const month of last6MonthsStrings) {
      let co2ThisMonth = 0;
      for (const route of routesLast6Months) {
        const routeMonth = route.time.substring(0, 7);
        if (month === routeMonth) {
          const co2Route = routeService.getCo2Kilograms(route);
          co2ThisMonth += co2Route;
        }
      }
      const avgCo2PerDayThisMonth = this.divideByDaysInMonth(co2ThisMonth, month);
      avgCo2PerDayLast6MonthsArray.push(avgCo2PerDayThisMonth);
    }
    return avgCo2PerDayLast6MonthsArray;
  }

  public divideByDaysInMonth(value: number, monthStr: string): number {
    const year = monthStr.substring(0, 4);
    const month = monthStr.substring(5, 7);
    let days: number;
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        days = 31;
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        days = 30;
        break;
      case '02':
        days = 28;
        const y = Number(year);
        if (y % 4 === 0) {
          days = 29;
          if (y % 100 === 0) {
            days = 28;
            if (y % 400 === 0) {
              days = 29;
            }
          }
        }
        break;
      default:
        days = 30;
        break;
    }
    const result = value / days;
    return result;
  }

  public getDistanceLast30DaysByVehicle(routeService: RouteService, vehicleType: string): number {
    let distLast30DaysByVehicle = 0;
    const routesLast30Days = this.getRoutesLast30Days();
    for (const route of routesLast30Days) {
      const routeVehicleType = routeService.getVehicle(route).type;
      if (routeVehicleType === vehicleType) {
        const kmRoute = routeService.getDistance(route) / 1000;
        distLast30DaysByVehicle += kmRoute;
      }
    }
    return distLast30DaysByVehicle;
  }

  public setRoute(route: Route): void {
    if (route.id === 'new') {
      route.id = DataService.uuidv4();
    }
    this.data.routes[route.id] = route;
    this.setStorage();
  }

  public setRouteVehicle(route: Route, vehicleId: string): void {
    this.data.routes[route.id].vehicleId = vehicleId;
    this.setStorage();
  }

  public setRoutePassengers(route: Route, passengers: number): void {
    this.data.routes[route.id].passengers = passengers;
    this.setStorage();
  }

  public deleteRoute(route: Route): void {
    delete this.data.routes[route.id];
    this.setStorage();
  }

  // Vehicles

  public setVehicle(vehicle: Vehicle): void {
    if (vehicle.id === 'new') {
      vehicle.id = DataService.uuidv4();
    }
    this.data.vehicles[vehicle.id] = vehicle;
    this.setStorage();
  }

  public getVehicle(vehicleId: string): Vehicle {
    return this.data.vehicles[vehicleId];
  }

  public getVehicles(): Vehicle[] {
    return Object.values(this.data.vehicles);
  }

  public getActiveVehicles(): Vehicle[] {
    return Object.values(this.data.vehicles).filter((v) => v.active);
  }

  public getDefaultVehicles(): Vehicle[] {
    return Object.values(this.data.vehicles).filter((v) => v.default);
  }

  public getCustomActiveVehicles(): Vehicle[] {
    return Object.values(this.data.vehicles).filter((v) => !v.default && v.active);
  }

  public getActiveTransportModes(): string[] {
    const activeVehicles = this.getVehicles().filter(v => v.active);
    return [...new Set(activeVehicles.map(v => v.travelmode.toUpperCase()))];
  }

  // CO2

  public setCo2PersonalChallenge(co2: Co2): void {
    this.data.co2 = co2;
    this.setStorage();
  }

  public getCo2PersonalChallenge(): Co2 {
    return this.data.co2;
  }

  // Storage

  public setStorage(): void {
    this.storage.set(STORAGE_KEY, this.data || DataService.defaultStorage());
  }

  public getStorage(): Storage {
    this.data = this.storage.get(STORAGE_KEY) || DataService.defaultStorage();
    return this.data;
  }

  public resetStorage(): void {
    this.data = DataService.defaultStorage();
    this.setStorage();
  }

  public setStorageManually(result: Storage): void {
    this.data = result;
    this.setStorage();
  }

  public getStorageSize(): string {
    const size = new TextEncoder().encode(JSON.stringify(this.data)).length;
    const kiloBytes = size / 1024;
    const kiloBytesString = formatNumber(kiloBytes, 'en_US', '1.1-1');
    return `${kiloBytesString} kB`;
  }

  // Initial Setup

  public setUsername(s: string): void {
    this.data.username = s;
    this.setStorage();
  }

  public getUsername(): string {
    return this.data.username;
  }

  public setSetupCompleted(b: boolean): void {
    this.data.setupCompleted = b;
    this.setStorage();
  }

  public getSetupCompleted(): boolean {
    return this.data.setupCompleted;
  }

  public setFavRoute(route: Route): void {
    // this id will be unique and used as reference
    // ToThink: What about having favourites A to B and B to A which are the same route but are not?
    const newId = route.from.place_id + route.to.place_id;

    const favRoute : FavRoute = {
      id: newId,
      from: route.from,
      to: route.to
    } 


    this.data.favRoutes[newId] = favRoute;
    this.setStorage();
  }

  public deleteFavRoute(route: Route): void {
    const deleteId = route.from.place_id + route.to.place_id;

    delete this.data.favRoutes[deleteId];
    this.setStorage();
  }

  public getFavRoutes(): { [id: string]: FavRoute} {
    return this.data.favRoutes;
  }
}
