import { Component, OnInit } from '@angular/core';
import { faCarSide, faMotorcycle, faBicycle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-custom-vehicles',
  templateUrl: './custom-vehicles.component.html',
  styleUrls: ['./custom-vehicles.component.css']
})
export class CustomVehiclesComponent implements OnInit {

  icons = {
    car: faCarSide,
    motorcycle: faMotorcycle,
    bicycle: faBicycle,
    edit: faEdit,
    delete: faTrashAlt
  };

  customVehicles = VEHICLES.filter((v) => v.active && !v.default);
  defaultVehicles = VEHICLES.filter((v) => v.default);

  bicycle = false;

  constructor() { }

  ngOnInit(): void {
  }

  delete(vehicle: Vehicle): void {
    if (window.confirm(`Deleting vehicle "${vehicle.name}".`)) {
      // TODO
    }
  }

  handleDefaultVehicleClick(vehicle): void {
    vehicle.active = !vehicle.active;
  }
}

const VEHICLES = [
  {
    id: 'uuidv4_-1',
    name: 'Bicycle',
    icon: 'bicycle',
    co2: 0,
    active: true,
    default: true
  },
  {
    id: 'uuidv4_-2',
    name: 'Average Car',
    icon: 'car',
    co2: 251,
    active: true,
    default: true
  },
  {
    id: 'uuidv4_0',
    name: 'H-WR 1337',
    icon: 'car',
    co2: 251,
    active: true,
    default: false
  },
  {
    id: 'uuidv4_1',
    name: 'My speedy bike',
    icon: 'motorcycle',
    co2: 78,
    active: true,
    default: false
  }
];
