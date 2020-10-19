import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-custom-vehicles',
  templateUrl: './custom-vehicles.component.html',
  styleUrls: ['./custom-vehicles.component.css']
})
export class CustomVehiclesComponent implements OnInit {

  icons = {
    edit: faEdit,
    delete: faTrashAlt,
  };

  customVehicles = VEHICLES.filter((v) => v.active && !v.default);
  defaultVehicles = VEHICLES.filter((v) => v.default);

  bicycle = false;

  constructor() { }

  ngOnInit(): void {
  }

  delete(vehicle: Vehicle): void {
    if (window.confirm(`Delete vehicle "${vehicle.name}"?`)) {
      // TODO
    }
  }

  handleDefaultVehicleClick(vehicle): void {
    vehicle.active = !vehicle.active;
  }
}

export const VEHICLES = [
  {
    id: 'uuidv4_-1',
    name: 'Walking',
    type: 'walking',
    co2: 0,
    active: true,
    default: true
  },
  {
    id: 'uuidv4_-2',
    name: 'Bicycle',
    type: 'bicycle',
    co2: 0,
    active: true,
    default: true
  },
  {
    id: 'uuidv4_-3',
    name: 'Public Transportation',
    type: 'train',
    co2: 50,
    active: true,
    default: true
  },
  {
    id: 'uuidv4_-4',
    name: 'Average Car',
    type: 'car',
    co2: 251,
    active: true,
    default: true
  },
  {
    id: 'uuidv4_0',
    name: 'H-WR 1337',
    type: 'car',
    co2: 251,
    active: true,
    default: false
  },
  {
    id: 'uuidv4_1',
    name: 'My speedy bike',
    type: 'motorcycle',
    co2: 78,
    active: true,
    default: false
  }
];
