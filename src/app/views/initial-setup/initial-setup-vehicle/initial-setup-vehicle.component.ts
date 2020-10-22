import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Storage } from '../../../models/storage';
import { Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-initial-setup-vehicle',
  templateUrl: './initial-setup-vehicle.component.html',
  styleUrls: ['./initial-setup-vehicle.component.css']
})

export class InitialSetupVehicleComponent implements OnInit {

  data: Storage;
  username: string;

  defaultVehicles: Vehicle[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStorage();
    this.getDefaultVehicles();
    this.username = this.data.username;
  }

  getStorage(): void {
    this.data = this.dataService.getStorage();
  }

  getDefaultVehicles(): void {
    this.defaultVehicles = this.dataService.getVehicles().filter((v) => v.init);
  }

  handleDefaultVehicleClick(vehicle): void {
    vehicle.active = !vehicle.active;
    this.dataService.setStorage();
  }
}
