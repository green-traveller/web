import { Injectable } from '@angular/core';
import {
  faCarSide,
  faMotorcycle,
  faBicycle,
  faWalking,
  faSubway,
  faQuestion,
  faEdit,
  faTrashAlt,
  faMapMarked,
  faClock,
  faUsers,
  faRoute,
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
    unknown: faQuestion,
    car: faCarSide,
    circle: faCircle,
    motorcycle: faMotorcycle,
    bicycle: faBicycle,
    train: faSubway,
    walking: faWalking,
    edit: faEdit,
    delete: faTrashAlt,
    map: faMapMarked,
    clock: faClock,
    users: faUsers,
    distance: faRoute
  };

  getIcon(name: string): IconDefinition{
    if (this.APP_ICONS[name]) {
      return this.APP_ICONS[name];
    } else {
      return this.APP_ICONS.unknown;
    }
  }

  constructor() { }
}
