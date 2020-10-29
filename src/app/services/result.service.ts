import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { Route } from '../models/route';
import { RouteService } from './route.service';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private route: Route;
  private search: Search;

  constructor(
    private dataService: DataService
  ) { }

  setRoute(route: Route): void {
    this.route = route;
    this.dataService.setLastRoute(route);
  }

  getRoute(): Route {
    return this.route;
  }

  resetRoute(): void {
    this.route = undefined;
    this.search = undefined;
  }

  setSearch(search: Search): void {
    this.search = search;
  }

  getSearch(): Search {
    return this.search;
    this.dataService.resetLastRoute();
  }
}
