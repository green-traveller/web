import { Injectable } from '@angular/core';
import {
  faBicycle,
  faCarSide,
  faChartPie,
  faChevronLeft,
  faClock,
  faCog,
  faDatabase,
  faEdit,
  faInfoCircle,
  faLeaf,
  faLightbulb,
  faMapMarked,
  faMotorcycle,
  faQuestion,
  faQuestionCircle,
  faRedoAlt,
  faRoute,
  faSearch,
  faSubway,
  faTrashAlt,
  faUser,
  faUsers,
  faWalking,
  faShare,
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
    back: faChevronLeft,
    bicycle: faBicycle,
    car: faCarSide,
    clock: faClock,
    circle: faCircle,
    data: faDatabase,
    delete: faTrashAlt,
    distance: faRoute,
    edit: faEdit,
    info: faInfoCircle,
    leaf: faLeaf,
    map: faMapMarked,
    motorcycle: faMotorcycle,
    preferences: faCog,
    question: faQuestionCircle,
    redo: faRedoAlt,
    search: faSearch,
    share: faShare,
    statistics: faChartPie,
    tip: faLightbulb,
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
