import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { formatNumber } from '@angular/common';

import { Storage } from '../models/storage';
import { Co2 } from '../models/co2';
import { Vehicle } from '../models/vehicle';
import { Route } from '../models/route';
import { RouteService } from 'src/app/services/route.service';

const STORAGE_KEY = 'TEST';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getStorage();
  }

  private routeService: RouteService

  data: Storage;

  static defaultStorage(): Storage {
    return JSON.parse(JSON.stringify({
      version: 0,
      username: 'User',
      setupCompleted: false,
      co2: {
        mode: 'average',
        value: 148
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
      routes: {
      }
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
    var routesLast30Days = [];
    const routes = this.getRoutes();
    //TO DO: use object instead of array
    const last30DaysStrings = this.getLast30DaysStrings();
    for (var date of last30DaysStrings) {   
      for (var route of routes) {
        var routeDate = route.time.split(' ')[0];
        if (date === routeDate) {
          routesLast30Days.push(route);
        }
      }
    }
    return routesLast30Days;
  }
  public getRoutesLast6MonthsInclCurrent(): Route[] {    
    var routesLast6Months = [];
    const routes = this.getRoutes();
    //TO DO: use object instead of array
    const last6MonthsStrings = this.getLastXMonthsStrings(6);
    for (var month of last6MonthsStrings) {   
      for (var route of routes) {
        var routeMonth = route.time.substring(0,7);
        if (month === routeMonth) {
          routesLast6Months.push(route);
        }
      }
    }
    return routesLast6Months;
  }

  public getDateString(date: Date): string {    
    const dateStr = date.getFullYear()+'-'+formatNumber((date.getMonth()+1), 'en_US', '2.0-0')+'-'+formatNumber(date.getDate(), 'en_US', '2.0-0');
    return dateStr;
  }
  
  public getMonthString(date: Date): string {    
    const monthStr = date.getFullYear()+'-'+formatNumber((date.getMonth()+1), 'en_US', '2.0-0');
    return monthStr;
  }

  public getLast30DaysStrings(): string[] {
    const today = Date.now();
    const days = 24*3600*1000;
    var last30DaysStrings = [];
    for (var i=30; i>=1; i--) {
      const date = new Date(today - (i*days));
      const dateStr = this.getDateString(date);
      last30DaysStrings.push(dateStr);    
    }
    return last30DaysStrings;
  }

  public getLastXMonthsStrings(x: number): string[] {
    const today = new Date();
    const thisYear: number = today.getFullYear();
    const thisMonth: number = today.getMonth()+1;
    var lastXMonthsStrings = [];
    for (var i=0; i<x; i++) {
      var month: number = thisMonth - i;
      var year: number = thisYear;
      var monthStr: string;
      while (month <= 0) {
        month += 12;
        year--;
        }     
      monthStr = year.toString()+'-'+formatNumber(month, 'en_US', '2.0-0');
      lastXMonthsStrings.push(monthStr);
    }
    lastXMonthsStrings.reverse();
    return lastXMonthsStrings;
  }

  public getTotalCo2Last30Days(routeService: RouteService): number { 
    var totalCo2Last30Days = 0;  
    const routesLast30Days = this.getRoutesLast30Days();
    for (const route of routesLast30Days) {
      var co2Route = routeService.getCo2Kilograms(route);
      totalCo2Last30Days += co2Route;      
      }    
    return totalCo2Last30Days;
  }

  public getCo2Last30DaysByVehicle(routeService: RouteService, vehicleType: string): number { 
    var co2Last30DaysByVehicle = 0;  
    const routesLast30Days = this.getRoutesLast30Days();
    for (const route of routesLast30Days) {
      var routeVehicleType = routeService.getVehicle(route).type;
      if (routeVehicleType === vehicleType) {
        var co2Route = routeService.getCo2Kilograms(route);
        co2Last30DaysByVehicle += co2Route; 
      }           
    }    
    return co2Last30DaysByVehicle;
  }

  public getAvgCo2PerDayLast6MonthsArr(routeService: RouteService): number[] { 
    var avgCo2PerDayLast6MonthsArray = [];  
    const routesLast6Months = this.getRoutesLast6MonthsInclCurrent();
    const last6MonthsStrings = this.getLastXMonthsStrings(6);
    for (var month of last6MonthsStrings) {
      var co2ThisMonth: number = 0;   
      for (var route of routesLast6Months) {
        var routeMonth = route.time.substring(0,7);
        if (month === routeMonth) {
          var co2Route = routeService.getCo2Kilograms(route);
          co2ThisMonth += co2Route; 
        }
      }
      var avgCo2PerDayThisMonth = this.divideByDaysInMonth(co2ThisMonth, month)
      avgCo2PerDayLast6MonthsArray.push(avgCo2PerDayThisMonth)
    }     
    return avgCo2PerDayLast6MonthsArray;
  }

  public divideByDaysInMonth(value: number, monthStr: string): number {    
    const year = monthStr.substring(0,4)
    const month = monthStr.substring(5,7)    
    var days : number;
    switch(month) { 
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
        var y = Number(year)
        var days = 28
        if (y%4===0) {
          if (y%100===0) {
            if (y%400===0) {
              days = 29;
            }
          }
          else {
            days = 29;
          }
        }
        break;      
      default: 
        days = 30;
        break;
    }
    var result = value / days; 
    return result;
  }

  public getDistanceLast30DaysByVehicle(routeService: RouteService, vehicleType: string): number { 
    var distLast30DaysByVehicle = 0;  
    const routesLast30Days = this.getRoutesLast30Days();
    for (const route of routesLast30Days) {
      var routeVehicleType = routeService.getVehicle(route).type;
      if (routeVehicleType === vehicleType) {
        var kmRoute = routeService.getDistance(route) / 1000;
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

  public setCo2(co2: Co2): void {
    this.data.co2 = co2;
    this.setStorage();
  }

  public getCo2(): Co2 {
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
}
