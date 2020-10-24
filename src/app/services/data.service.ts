import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { Storage } from '../models/storage';
import { Co2 } from '../models/co2';
import { Vehicle } from '../models/vehicle';
import { Route } from '../models/route';

const STORAGE_KEY = 'TEST';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getStorage();
  }

  data: Storage;

  static defaultStorage(): Storage {
    return JSON.parse(JSON.stringify({
      version: 0,
      name: 'User',
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
          travelmode: 'walking'
        },
        bicycling: {
          id: 'bicycling',
          name: 'Bicycle',
          type: 'bicycle',
          co2: 0,
          active: true,
          default: true,
          travelmode: 'bicycling'
        },
        transit: {
          id: 'transit',
          name: 'Public Transportation',
          type: 'train',
          co2: 65, // https://www.co2nnect.org/help_sheets/?op_id=602&opt_id=98
          active: true,
          default: true,
          travelmode: 'transit'
        },
        driving: {
          id: 'driving',
          name: 'Average Car',
          type: 'car',
          co2: 175,
          active: true,
          default: true,
          travelmode: 'driving'
        }
      },
      routes: {}
    }));
  }

  static uuidv4(): string {
    return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
      // tslint:disable-next-line:no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  // Routes

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

  setStorageManually(result: Storage): void {
    this.data = result;
    this.setStorage();
  }
}
