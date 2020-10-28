import { Injectable } from '@angular/core';
import {
  faBicycle,
  faCarSide,
  faChartPie,
  faClock,
  faEdit,
  faMapMarked,
  faMotorcycle,
  faQuestion,
  faRoute,
  faSubway,
  faTrashAlt,
  faUsers,
  faWalking,
  faCloud,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {
  faCircle
} from '@fortawesome/free-regular-svg-icons';


@Injectable({
  providedIn: 'root'
})
export class IconService {

  APP_ICONS = {
    bicycle: faBicycle,
    car: faCarSide,
    clock: faClock,
    cloud: faCloud,
    circle: faCircle,
    delete: faTrashAlt,
    distance: faRoute,
    edit: faEdit,
    map: faMapMarked,
    motorcycle: faMotorcycle,
    statistics: faChartPie,
    train: faSubway,
    unknown: faQuestion,
    users: faUsers,
    walking: faWalking
  };

  getIcon(name: string): IconDefinition {
    if (this.APP_ICONS[name]) {
      return this.APP_ICONS[name];
    } else {
      return this.APP_ICONS.unknown;
    }
  }

  constructor() { }
}
