import { RouteLocation } from './route-location';
import { RouteOption } from './route-option';

export interface Route {
  from: RouteLocation;
  to: RouteLocation;
  time: string;
  vehicleId: string;
  passengers: number;
  distance: number;
  options: { [optionName: string]: RouteOption };
}
