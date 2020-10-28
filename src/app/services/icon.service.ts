import { Injectable } from '@angular/core';
import {
  faBicycle,
  faCarSide,
  faChartPie,
  faClock,
  faDatabase,
  faEdit,
  faInfoCircle,
  faMapMarked,
  faMotorcycle,
  faQuestion,
  faQuestionCircle,
  faRedoAlt,
  faRoute,
  faSubway,
  faTrashAlt,
  faUser,
  faUsers,
  faWalking,
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
    circle: faCircle,
    data: faDatabase,
    delete: faTrashAlt,
    distance: faRoute,
    edit: faEdit,
    info: faInfoCircle,
    map: faMapMarked,
    motorcycle: faMotorcycle,
    question: faQuestionCircle,
    redo: faRedoAlt,
    statistics: faChartPie,
    train: faSubway,
    unknown: faQuestion,
    user: faUser,
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
