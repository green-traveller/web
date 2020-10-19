import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Vehicle } from '../../../models/vehicle';
import { DataService } from '../../../services/data.service';

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

  customVehicles: Vehicle[];
  defaultVehicles: Vehicle[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDefaultVehicles();
    this.getCustomVehicles();
  }

  getDefaultVehicles(): void {
    this.defaultVehicles = this.dataService.getVehicles().filter((v) => v.default);
  }

  getCustomVehicles(): void {
    this.customVehicles = this.dataService.getVehicles().filter((v) => v.active && !v.default);
  }

  delete(vehicle: Vehicle): void {
    if (window.confirm(`Delete vehicle "${vehicle.name}"?`)) {
      vehicle.active = false;
      this.dataService.setStorage();
      this.getCustomVehicles();
    }
  }

  handleDefaultVehicleClick(vehicle): void {
    vehicle.active = !vehicle.active;
    this.dataService.setStorage();
  }
}
