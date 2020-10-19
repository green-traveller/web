import { RouteLocation } from './route-location';
import {RouteOption} from './route-option';

export interface Route {
  from: RouteLocation;
  to: RouteLocation;
  time: string;
  vehicleId: string;
  options: { [optionName: string]: RouteOption };
}
