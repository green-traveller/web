import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-initial-setup-vehicle',
  templateUrl: './initial-setup-vehicle.component.html',
  styleUrls: ['./initial-setup-vehicle.component.css']
})

export class InitialSetupVehicleComponent implements OnInit {

  username: string;

  defaultVehicles: Vehicle[];

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.getDefaultVehicles();
    this.username = this.dataservice.getUsername();
  }

  getDefaultVehicles(): void {
    this.defaultVehicles = this.dataservice.getVehicles().filter((v) => v.init);
  }

  handleDefaultVehicleClick(vehicle): void {
    vehicle.active = !vehicle.active;
    this.dataservice.setStorage();
  }
}
