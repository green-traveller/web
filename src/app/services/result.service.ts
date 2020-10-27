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
    this.route = route;
  }

  getRoute(): Route {
    return this.route;
  }

  resetRoute(): void {
    this.route = null;
  }
}
