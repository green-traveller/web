import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Vehicle } from '../../../../models/vehicle';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  id: string;
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute, private location: Location, private dataService: DataService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vehicle = this.getVehicle();
  }

  getVehicle(): Vehicle {
    let vehicle = this.dataService.getVehicle(this.id);
    if (!vehicle) {
      vehicle = {
        id: 'new',
        name: 'new car',
        type: 'car',
        co2: 251,
        active: true,
        default: false,
        travelmode: 'driving'
      };
    }
    return JSON.parse(JSON.stringify(vehicle));
  }

  handleSaveClick(): void {
    this.dataService.setVehicle(this.vehicle);
    this.location.back();
  }
}
