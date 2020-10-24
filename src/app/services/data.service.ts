import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { formatNumber } from '@angular/common';

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
      routes: {
        '7c3173f6-d0a4-4d8f-9f6e-c26322fbc2aa': {
          id: '7c3173f6-d0a4-4d8f-9f6e-c26322fbc2aa',
          from: {
            name: 'start',
            place_id: '1'},
          to: {
            name: 'destination',
            place_id: '2'},
          time: '01-01-1970 00:00',
          vehicleId: 'walking',
          passengers: 1,
          options: {
            walking: {
              distance: 5000,
              duration: 5000,
            },
            bicycling: {
              distance: 5000,
              duration: 2000,
            },
            transit: {
              distance: 4000,
              duration: 1500,
            },
            driving: {
              distance: 6000,
              duration: 3000,
            },
          }
        },
        'f1bbd0b2-8dfb-407b-884a-86b2a9f3e821': {
          id: 'f1bbd0b2-8dfb-407b-884a-86b2a9f3e821',
          from: {
            name: 'start',
            place_id: '1'},
          to: {
            name: 'destination',
            place_id: '2'},
          time: '01-01-1970 00:00',
          vehicleId: 'driving',
          passengers: 1,
          options: {
            walking: {
              distance: 50000,
              duration: 50000,
            },
            bicycling: {
              distance: 50000,
              duration: 20000,
            },
            transit: {
              distance: 40000,
              duration: 15000,
            },
            driving: {
              distance: 60000,
              duration: 30000,
            },
          }
        },
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

  public getRoutes(): { [id: string]: Route} {
    return this.data.routes;
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
}
