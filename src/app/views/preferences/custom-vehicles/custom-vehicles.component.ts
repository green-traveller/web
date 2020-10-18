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

  vehicles = VEHICLES;
  lastDeletedVehicle = undefined;

  bicycle = false;

  constructor() { }

  ngOnInit(): void {
  }

  delete(vehicle: Vehicle): void {
    if (window.confirm(`Deleting vehicle ${vehicle.name}`)) {
      // TODO
    }
  }

  handleBicycleClick(): void {
    this.bicycle = !this.bicycle;
  }
}

const VEHICLES = [
  {
    id: 'uuidv4_0',
    name: 'H-WR 1337',
    icon: 'car',
    co2: 251
  },
  {
    id: 'uuidv4_1',
    name: 'My speedy bike',
    icon: 'motorcycle',
    co2: 78
  }
];
