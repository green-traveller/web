import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route } from '../models/route';
import { DataService } from './data.service';
import { ResultService } from './result.service';
import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MapsSdkService {

  private url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';
  private key = environment.apiKey;
  private loaded = false;
  private toExecute = [];
  private directionsService: google.maps.DirectionsService;

  constructor(private dataService: DataService, private resultService: ResultService) {
    const element = document.createElement('script');
    element.src = this.url + this.key;
    element.type = 'text/javascript';
    element.async = true;
    element.onload = () => {
      console.log('Maps SDK ready.');
      this.loaded = true;
      this.directionsService = new google.maps.DirectionsService();
      for (const fn of this.toExecute) {
        fn();
      }
    };
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  onload(fn: () => void): void {
    if (this.loaded) {
      fn();
    } else {
      this.toExecute.push(fn);
    }
  }

  searchRoute(route: Route, timeMode: string, time: Date, callback: (route: Route) => void): void {
    const activeTransportModes = this.dataService.getActiveTransportModes();
    const requestVariables = [];
    for (const travelMode of activeTransportModes) {
      const variable = {
        travelMode
      };
      if (travelMode === 'TRANSPORT') {
        if (timeMode === 'departure') {
          // @ts-ignore
          variable.departureTime = time;
        }
        if (timeMode === 'arrival') {
          // @ts-ignore
          variable.arrivalTime = time;
        }
      }
      if (travelMode === 'DRIVING') {
        if (timeMode === 'departure') {
          // @ts-ignore
          variable.departureTime = time;
        }
      }
      requestVariables.push(variable);
    }
    const requestBase = {
      origin: { placeId: route.from.place_id },
      destination: { placeId: route.to.place_id },
      unitSystem: google.maps.UnitSystem.METRIC
    };
    let requestCount = 0;
    for (const variable of requestVariables) {
      // @ts-ignore
      this.directionsService.route({...requestBase, ...variable}, (result, status) => {
        requestCount++;
        if (status === 'OK') {
          route.options[variable.travelMode.toLowerCase()] = {
            distance: result.routes[0].legs[0].distance.value,
            duration: result.routes[0].legs[0].duration.value
          };
        }
        if (requestCount === requestVariables.length) {
          this.resultService.setRoute(route);
          callback(route);
        }
      });
    }
  }
}
