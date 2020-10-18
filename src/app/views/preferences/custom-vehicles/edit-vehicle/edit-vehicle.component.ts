import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VEHICLES } from '../custom-vehicles.component';
import { Vehicle } from '../../../../models/vehicle';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  id: string;
  vehicles = VEHICLES;
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vehicle = this.getVehicle();
  }

  getVehicle(): Vehicle {
    let vehicle = this.vehicles.find(v => v.id === this.id);
    if (!vehicle) {
      vehicle = {
        id: 'new',
        name: 'new car',
        type: 'car',
        co2: 251,
        active: true,
      default: false
      };
    }
    return vehicle;
  }

  handleSaveClick(): void {
    this.location.back();
  }
}
