import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route } from '../models/route';
import { DataService } from './data.service';
import { ResultService } from './result.service';
import {} from 'googlemaps';
import { Search } from '../models/search';
import { formatDate } from '@angular/common';
import { SearchResult } from '../models/search-result';

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

  searchRoute(search: Search, callback: (searchResult: SearchResult) => void): void {
    const route: Route = {
      id: 'new',
      from: {
        name: search.from.name,
        place_id: search.from.place_id
      },
      to: {
        name: search.to.name,
        place_id: search.to.place_id
      },
      time: formatDate(search.time, 'yyyy-MM-dd HH:mm', 'en_US'),
      vehicleId: 'unknown',
      passengers: search.passengerAmount,
      options: {}
    };
    const activeTransportModes = this.dataService.getActiveTransportModes();
    const requestVariables = [];
    for (const travelMode of activeTransportModes) {
      const variable = {
        travelMode
      };
      if (travelMode === 'driving') {
        if (search.timeMode === 'departure') {
          // @ts-ignore
          variable.departureTime = time;
        }
        if (search.timeMode === 'arrival') {
          // @ts-ignore
          variable.arrivalTime = time;
        }
      }
      if (travelMode === 'driving') {
        if (search.timeMode === 'departure') {
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
          if (Object.keys(route.options).length < 1) {
            callback({ success: false, message: 'No results found.' });
          } else {
            this.resultService.setRoute(route);
            this.resultService.setSearch(search);
            callback({ success: true, message: 'Success.' });
          }
        }
      });
    }
  }
}
