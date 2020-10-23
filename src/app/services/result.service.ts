import { Injectable } from '@angular/core';
import {Route} from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private route: Route;

  constructor() { }

  setRoute(route: Route): void {
    this.route = route;
  }

  getRoute(): Route {
    return this.route;
  }
}
