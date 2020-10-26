import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Vehicle } from '../../../../models/vehicle';
import { DataService } from '../../../../services/data.service';

const DEFAULT_VEHICLE_NAME = 'My own vehicle';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  @ViewChild('carbonInput') carbonInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;

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
        name: DEFAULT_VEHICLE_NAME,
        type: 'car',
        co2: 175,
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

  handleCancelClick(): void {
    this.location.back();
  }

  focusOnCarbonInput(): void {
    this.carbonInput.nativeElement.focus();
  }

  handleCarbonInputChange(): void {
    if (!this.carbonInput.nativeElement.validity.valid || this.vehicle.co2 === null) {
      this.vehicle.co2 = 175;
    }
  }

  handleNameInputChange(): void {
    if (this.vehicle.name === '') {
      this.vehicle.name = DEFAULT_VEHICLE_NAME;
    }
  }
}
